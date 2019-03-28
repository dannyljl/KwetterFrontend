import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../Models/User';
import {stringify} from 'querystring';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  json: string;

  Login(user: User): Observable<User> {
    this.json = JSON.stringify(user);
    return this.http.post<User>('http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/login', this.json, httpOptions);
  }

  Register(user: User): Observable<User> {
    this.json = JSON.stringify(user);
    return this.http.post<User>('http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/login/register', this.json, httpOptions);
  }
}
