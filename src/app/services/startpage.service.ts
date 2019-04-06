import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Kweet} from '../../Models/Kweet';
import {FormGroup} from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StartpageService {

  constructor(private http: HttpClient) { }
  json: string;

  GetTimeline(userId: number) {
    return this.http.get<Array<Kweet>>
    (`http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/startpage/${userId}`, httpOptions);
  }

  search(content: string) {
    this.json = JSON.stringify(content);
    return this.http.post<Array<Kweet>>
    (`http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/startpage/search`, this.json, httpOptions);
  }

  createTweet(content: string, userId: number) {
    this.json = JSON.stringify(content);
    return this.http.put
    (`http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/startpage/${userId}`, this.json, httpOptions);
  }
}
