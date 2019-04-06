import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  startPage: FormGroup;

  user: User;
  visitedUser: User;
  kweets: Kweet[];
  searchedKweets: object;
  createdKweet: Kweet;

  constructor(
    private formbuilder: FormBuilder,
    private startpageService: StartpageService,
    private router: Router,
    private profilepageService: ProfileService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.startPage = this.formbuilder.group({
      searchedKweet: ['', Validators.required],
      createdKweet: ['', Validators.required]
    });

    this.user = JSON.parse(localStorage.getItem('loggedUser'));

    this.visitedUser = JSON.parse(localStorage.getItem('visitedUser'));

    this.startpageService.GetTimeline(this.user.userId).subscribe(data => {
      this.kweets = data;
    });
  }

  get f() {return this.startPage.controls; }

  search() {
    this.startpageService.search(this.f.searchedKweet.value).subscribe(data => {
      this.searchedKweets = data;
    });
  }

  createKweet() {
    this.startpageService.createTweet(this.f.createdKweet.value, this.user.userId).subscribe();
    this.startpageService.GetTimeline(this.user.userId).subscribe(data => {
      this.kweets = data;
    });
    this.ref.detectChanges();
  }

  profile(userId: number) {
    this.profilepageService.GetUser(userId).subscribe(data =>
      this.visitedUser = data

    );
    localStorage.setItem('visitedUser', JSON.stringify(this.visitedUser));
    this.router.navigate(['profilepage']);
  }

  logout() {

  }



}
