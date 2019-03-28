import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../Models/User';
import {Observable, ObservableLike} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  json: string;

  FollowUser(myId: number, theirId: number): Observable<string> {
    return this.http.post<string>('http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/profilePage/' + theirId + '/' + myId, httpOptions);
  }

  GetUser(theirId: number): Observable<User> {
    return this.http.get<User>('http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/profilePage/' + theirId , httpOptions);
  }

  EditProfile(theirId: number, myId: number, user: User) {
    this.json = JSON.stringify(user);
    return this.http.post<string>
    ('http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/profilePage/'
      + theirId
      + '/'
      + myId
      + '/edit'
      , this.json, httpOptions);
  }
}
