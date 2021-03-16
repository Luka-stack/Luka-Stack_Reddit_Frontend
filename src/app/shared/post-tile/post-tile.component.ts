import { Component, Input, OnInit } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { PostModel } from '../post-model';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  @Input() posts?: Array<PostModel>
  faComments = faComments;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.posts);
  }

  goToPost(id: number) {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
