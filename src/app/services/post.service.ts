import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from '../post/model/PostModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<HttpResponse<any>>{
    return this.http.get<any>('http://localhost:8080/api/posts', {observe:'response'});
  }

  getById(id:number): Observable<HttpResponse<IPost>> {
    return this.http.get<IPost>(`http://localhost:8080/api/post/${id}`, {observe:'response'});
  }

  createPost(post:IPost): Observable<HttpResponse<any>>{
    return this.http.post<any>('http://localhost:8080/api/posts', post, {observe:'response'});
  }

  updatePost(post: IPost): Observable<HttpResponse<IPost>>{
    return this.http.put<IPost>(`http://localhost:8080/api/post/${post.id}`, post, {observe:'response'});
  }

  deletePost(post: IPost): Observable<HttpResponse<IPost>>{
    return this.http.delete<IPost>(`http://localhost:8080/api/post/${post.id}`, {observe:'response'});
  }
}
