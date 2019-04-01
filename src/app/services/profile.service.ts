import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../Models/User';
import {Observable} from 'rxjs';
import {Kweet} from '../../Models/Kweet';

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
  url: string;

  FollowUser(myId: number, theirId: number): Observable<string> {
    return this.http.post<string>(`http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/profilepage/${myId}/${theirId}`
      , null, httpOptions);
  }
  Edit(visitedId: number, visitorId: number, user: User): Observable<User> {
    this.json = JSON.stringify(user);
    this.url = `http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/profilepage/${visitedId}/edit/${visitorId}`;
    return this.http.post<User>(this.url, this.json, httpOptions);
  }

  GetUser(theirId: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/profilepage/${theirId}`);
  }

  GetLatestKweets(theirId: number) {
    return this.http.get<Array<Kweet>>(`http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/profilepage/${theirId}/kweets`);
  }
}
