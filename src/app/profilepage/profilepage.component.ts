import { Component, OnInit } from '@angular/core';
import {User} from '../../Models/User';
import {ProfileService} from '../services/profile.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.scss']
})
export class ProfilepageComponent implements OnInit {

  profileForm: FormGroup;

  user: User;
  visitedUser: User;
  newUser: User;
  kweets: object;

  constructor(private formbuilder: FormBuilder, private profileService: ProfileService, private router: Router) { }

  ngOnInit() {
    this.profileForm = this.formbuilder.group({
      bio: ['', Validators.required],
      image: ['', Validators.required],
      location: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      web: ['', Validators.required],
    });
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    this.visitedUser = JSON.parse(localStorage.getItem('visitedUser'));
    this.profileService.GetLatestKweets(this.visitedUser.userId).subscribe( data => {
      this.kweets = data;
      }
    );
  }

  get f() {return this.profileForm.controls; }

  onSubmit() {
    this.newUser = new User();
    this.newUser.bio = this.f.bio.value;
    this.newUser.image = this.f.image.value;
    this.newUser.location = this.f.location.value;
    this.newUser.name = this.f.name.value;
    this.newUser.username = this.f.username.value;
    this.newUser.web = this.f.web.value;

    console.log(this.newUser);
    // this.profileService.FollowUser(this.visitedUser.userId, this.user.userId);
    this.profileService.Edit(this.visitedUser.userId, this.user.userId, this.newUser)
      .subscribe(
        data => {
          if (data !== null) {
            this.visitedUser = data;
            console.log(this.visitedUser);
          }
        }
      );
  }

}
