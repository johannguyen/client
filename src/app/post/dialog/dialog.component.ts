import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostService } from '../../services/post.service';
import { ColorEvent } from 'ngx-color';
import { IPost } from '../model/PostModel';
import { PostValidationService } from 'src/app/util/post-validation.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public colors = ['#B80000', '#DB3E00', '#E1B500', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#F44336', '#9C27B0', '#795548'];

  public post:IPost;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public postService: PostService, public postValidationService: PostValidationService) { }

  ngOnInit() {
    if(this.data.type === "Edit"){
      this.getPost(this.data.id);
    }
  }

  getPost = async (id: number) =>{
    const response = await this.postService.getById(id).toPromise();
    if(response.ok){
      this.data = {...response.body, type: this.data.type};
    }
  }

  save(): void{
    if(this.postValidationService.validatePost(this.data)){
      this.dialogRef.close(this.data);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  getColorCode = (color: string) => {
    return `#${color}`;
  }

  handleColorChange = ($event: ColorEvent) => {
    this.data.color = $event.color.hex.substr(1);
  }
}
