import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  Login(user: User) {
    return this.http.post('http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/login', JSON.stringify(user));
  }
}
