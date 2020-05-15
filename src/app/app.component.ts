import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';
import { PostService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostService) { }

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errormessage=>{
      this.error = errormessage;
    });
    this.fetchPosts();
  }

  // onCreatePost(postData: Post) {
  //   //this.postsService.createAndStorePost(postData.title, postData.content);
  //   this.postsService.createAndStorePost(postData.title, postData.content).subscribe(
  //     data => console.log(data),
  //     error => console.log(error),
  //     () => this.fetchPosts()
  //   );
  // }

  onCreatePost(postData: Post) {
    //this.postsService.createAndStorePost(postData.title, postData.content);
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }

  private fetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.error = error.message;
        console.log(error)
      }
    );
  }
}
