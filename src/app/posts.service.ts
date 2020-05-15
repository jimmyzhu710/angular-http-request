import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class PostService {
    constructor(private http: HttpClient) { }
 
    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };
        // Send Http request
        return this.http.post<{ name: string }>(
            'https://angular-http-requests-6bec1.firebaseio.com/posts.json',
            postData
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

    deletePosts(){
       return this.http.delete('https://angular-http-requests-6bec1.firebaseio.com/posts.json');
    }
}