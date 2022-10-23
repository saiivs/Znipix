import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userInfo, token, post, userPost ,userProfileImage, comments, contests } from '../../models/models';
import { userCheck } from '../../models/models';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {}

  token: String | any = localStorage.getItem('userToken');
  file:post={}

  event=new EventEmitter();

  readonly url = 'http://localhost:3000';


  signup(data: userInfo): Observable<userInfo> {
    return this.http.post<userInfo>(this.url, data);
  }

  loginUser(data: userInfo): Observable<token> {
    console.log(data);
    return this.http.post<token>(`${this.url}/login`, data);
  }

  googleLogin(data:userInfo):Observable<userInfo>{
    return this.http.post<userInfo>(`${this.url}/googleLogin`,data)
  }

  userCheck(): Observable<userCheck> {
    let header = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post<userCheck>(`${this.url}/preventBack`, {
      headers: header,
    });
  }

  getToken(){
    return localStorage.getItem('userToken')||" "
  }

  userPost(data:any): Observable<any>{
    console.log(data.get('image'));
    return this.http.post<any>(`${this.url}/userPost`,data);
  }

  posts(): Observable<any>{
    return this.http.get<any>(`${this.url}/getPost`)
  }

  getUserPost(): Observable<userProfileImage>{
    return this.http.get<userProfileImage>(`${this.url}/userProfile`)
  }

  postCommentServer(id:string,comment:string):Observable<comments>{
    let comments={
      id:id,
      comment:comment
    }
    return this.http.post<comments>(`${this.url}/comments`,comments)
  }

  commentGet():Observable<comments>{
    return this.http.get<comments>(`${this.url}/getComments`)
  }

  editProfile(data:any):Observable<any>{
    return this.http.patch<any>(`${this.url}/editProfile`,data)
  }

  likedCount(id:string,status:boolean):Observable<any>{
    let data={
      postID:id,
      status:status
    }
    return this.http.post<any>(`${this.url}/createLike`,data)
  }

  Contest(data:contests){
    return this.http.post(`${this.url}/createContest`,data)
  }

  getContests():Observable<contests[]>{
    return this.http.get<contests[]>(`${this.url}/getContest`)
  }

  ContestDetails():Observable<contests[]>{
    return this.http.get<contests[]>(`${this.url}/singleContest`)
  }

  // getComments(): Observable<userPost>{
  //   return this.http.get<userPost>(``)
  // }

  // getUserProfile(): Observable<userInfo>{
  //   return this.http.get<userInfo>(`${this.url}/userDetails`)
  // }

  sample(data: userInfo): Observable<boolean> {
    let header = new HttpHeaders({ 'content-type': 'application/json' });
    header = header.append('authorise', this.token);
    return this.http.post<boolean>(`${this.url}/sample`, data, {
      headers: header,
    });
  }
}
