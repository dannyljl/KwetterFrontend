import { Component } from '@angular/core';
import {User} from '../Models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KwetterFrontEnd';

  loggerUser: User;

}
