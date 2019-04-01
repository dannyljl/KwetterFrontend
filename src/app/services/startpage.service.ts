import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
    return this.http.get('http://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/startpage/' + userId, httpOptions);
  }
}
