import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../../Models/User';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  user: User;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    const re = '/login/*';
    if (req.url.search(re) === -1) {
      console.log('boo');
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.user.token}`
        }
      });
    }
    return next.handle(req);

  }
}
