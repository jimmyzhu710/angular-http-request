import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
    providedIn: 'root'
})

export class PostService {
    error = new Subject<string>();

    constructor(private http: HttpClient) { }

    // createAndStorePost(title: string, content: string) {
    //     const postData: Post = { title: title, content: content };
    //     // Send Http request
    //     return this.http.post<{ name: string }>(
    //         'https://angular-http-requests-6bec1.firebaseio.com/posts.json',
    //         postData
    //     );
    // }     

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };
        // Send Http request
        this.http.post<{ name: string }>(
            'https://angular-http-requests-6bec1.firebaseio.com/posts.json',
            postData
        ).subscribe(responseData => {
            console.log(responseData);
        }, error => {
            this.error.next(error.message);
        }
        );
    }


    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>('https://angular-http-requests-6bec1.firebaseio.com/posts.json')
            .pipe(map((responseData) => {
                const postsArray: Post[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postsArray.push({ ...responseData[key], id: key });
                    }
                }
                return postsArray;
            }));
    }

    deletePosts() {
        return this.http.delete('https://angular-http-requests-6bec1.firebaseio.com/posts.json');
    }
}