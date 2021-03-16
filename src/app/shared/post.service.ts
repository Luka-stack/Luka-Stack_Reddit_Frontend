import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUrl = 'http://localhost:8080/api/posts'

  constructor(private httpClient: HttpClient) { }

  getPost(postId: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(this.postUrl +'/'+ postId);
  }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(this.postUrl);
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.httpClient.post(this.postUrl, postPayload);
  }

  getAllPostsByUser(username: string): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(this.postUrl +'/by-user/'+ username);
  }

}
