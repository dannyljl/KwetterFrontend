import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../Models/User';

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

  Login(user: User): any {
    this.json = JSON.stringify(user);
    return this.http.post<any>('http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/login', this.json, httpOptions);
  }
}
