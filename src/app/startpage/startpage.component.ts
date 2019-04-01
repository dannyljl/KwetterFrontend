import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProfileService} from '../services/profile.service';
import {Router} from '@angular/router';
import {StartpageService} from '../services/startpage.service';
import {User} from '../../Models/User';
import {Kweet} from '../../Models/Kweet';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  profileForm: FormGroup;

  user: User;
  visitedUser: User;
  kweets: object;

  constructor(private formbuilder: FormBuilder, private startpageService: StartpageService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    this.visitedUser = JSON.parse(localStorage.getItem('visitedUser'));
    this.kweets = this.startpageService.GetTimeline(this.visitedUser.userId);
    this.startpageService.GetTimeline(this.visitedUser.userId).subscribe(data => {
      this.kweets = data;
    });
  }

}
