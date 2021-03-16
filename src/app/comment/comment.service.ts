import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from './comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentUrl = 'http://localhost:8080/api/comments';

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<Array<CommentPayload>> {
    return this.httpClient.get<Array<CommentPayload>>(this.commentUrl +'/by-post/'+ postId);
  }

  getAllCommentsByUser(username: string): Observable<Array<CommentPayload>> {
    return this.httpClient.get<Array<CommentPayload>>(this.commentUrl +'/by-user/'+ username);
  }

  postComment(comment: CommentPayload): Observable<any> {
    return this.httpClient.post(this.commentUrl, comment);
  }
}
