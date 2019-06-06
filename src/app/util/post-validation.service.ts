import { Injectable } from '@angular/core';
import { IPost } from '../post/model/PostModel';

@Injectable({
  providedIn: 'root'
})
export class PostValidationService {

  constructor() { }

  validatePost = (post:IPost) => {
    if(post.message.length > 200){
      return false;
    }
    else{
      return true;
    }
  }
}
