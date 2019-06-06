import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import { IPost } from './model/PostModel';
import $ from 'jquery';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public posts = [];
  private currentPage = 0;
  private totalPage;
  public searchText="";
  public sortBy = "lastModifiedDate";
  public sortDirection = "desc";
  private stompClient:any;
  private webSocketMode:string = "on";

  constructor(private postService: PostService, public dialog: MatDialog) { 
    this.initializeWebSocketConnection();
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.ws.close();
    }
    console.log("Disconnected");
  }

  initializeWebSocketConnection(){
    
    let socket = new WebSocket("ws://localhost:8080/socket");

    this.stompClient = Stomp.over(socket);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/topic/post", (data) => {
        console.log("get here");
        if(data.body) {
          that.getPosts();
        }
      });
    });
  }

  checkSocketMode(mode){
    if(mode==="off"){
      this.disconnect();
    }
    else{
      this.initializeWebSocketConnection();
    }
  }

  sendPost(post:IPost){
    this.stompClient.send("/app/post" , {}, JSON.stringify(post));
  }

  ngOnInit() {
    //this.postService.getAllPosts().subscribe(posts => {this.posts = posts.content}, error => console.log(error.message));
    this.getPosts();
  }

  getPosts = async () =>{
    const response = await this.postService.getAllPosts().toPromise();
    this.posts = response.body;
  }

  updatePost = async (post: IPost) => {
    if(this.webSocketMode === "on"){
      this.sendPost(post);
    }
    else{
      const response = await this.postService.updatePost(post).toPromise();
      if(response.ok){
        this.getPosts();
      }
    }
  }

  createPost = async (post: IPost) => {
    if(this.webSocketMode === "on"){
      this.sendPost(post);
    }
    else{
      const response = await this.postService.createPost(post).toPromise();
      if(response.ok){
        this.getPosts();
      }
    }
  }

  deletePost = async (post:IPost) => {
    const response = await this.postService.deletePost(post).toPromise();
    if(response.ok){
      this.getPosts();
    }
  }

  getColorCode = (color: string): string => {
    return `#${color}`;
  }

  openEditDialog = (event: any,post: IPost): void => {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height:'300px',
      data: {...post, type:"Edit"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let post:IPost = {id:result.id, message: result.message, color: result.color};
        this.updatePost(post);
      }
    });
  }

  openNewDialog = (): void => {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height:'300px',
      data: {message: "", color: "e1b500", type:"Add"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let post:IPost = {id:null, message: result.message, color: result.color};
        this.createPost(post);
      }
    });
  }

  delete = (event:any, post:IPost): void => {
    event.stopPropagation();
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'250px',
      height:'200px',
      data: {...post, confirmMessage:"Do you want to delete post: "}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deletePost(post);
      }
    });
  }

  clearSearch = ():void => {
    if(this.searchText){
      this.searchText="";
    }
  }
}
