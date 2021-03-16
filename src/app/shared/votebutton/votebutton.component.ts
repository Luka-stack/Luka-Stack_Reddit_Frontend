import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { VoteService } from '../vote.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';
import { VotePayload } from './vote.payload';
import { VoteType } from './vote.type';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-vote-button',
  templateUrl: './votebutton.component.html',
  styleUrls: ['./votebutton.component.css']
})
export class VotebuttonComponent implements OnInit {

  @Input() post!: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  constructor(private voteService: VoteService, private authService: AuthService, 
              private postService: PostService, private toastr: ToastrService) 
  { 
    this.votePayload = {
      voteType: undefined,
      postId: undefined
    };

  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upVotePost() {
    this.votePayload.voteType = VoteType.UP_VOTE;
    this.vote();
  }

  downVotePost() {
    this.votePayload.voteType = VoteType.DOWN_VOTE;
    this.vote();
  }

  private vote() {
    this.votePayload.postId = this.post.id;

    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateVoteDetails() {
    if (this.post !== undefined) {
      this.postService.getPost(this.post.id).subscribe(post => {
        this.post = post;
      })
    }
  }

}
