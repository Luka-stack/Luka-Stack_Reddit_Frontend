import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubredditModel } from './subreddit-model';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  private subredditUrl = 'http://localhost:8080/api/subreddit';

  constructor(private httpClient: HttpClient) {  }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.httpClient.get<Array<SubredditModel>>(this.subredditUrl);
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    console.log("Inside Subreddit Service");
    return this.httpClient.post<SubredditModel>(this.subredditUrl, subredditModel);
  }

}
