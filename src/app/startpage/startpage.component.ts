import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../services/profile.service';
import {Router} from '@angular/router';
import {StartpageService} from '../services/startpage.service';
import {User} from '../../Models/User';
import {Kweet} from '../../Models/Kweet';
import {webSocket} from 'rxjs/webSocket';
import {create} from 'domain';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  startPage: FormGroup;

  token: string;

  user: User;
  visitedUser: User;
  kweets: Kweet[];
  searchedKweets: object;
  createdKweet: Kweet;
  subject;

  constructor(
    private formbuilder: FormBuilder,
    private startpageService: StartpageService,
    private router: Router,
    private profilepageService: ProfileService,
    private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.startPage = this.formbuilder.group({
      searchedKweet: ['', Validators.required],
      createdKweet: ['', Validators.required]
    });

    this.subject = webSocket('ws://localhost:8080/WebLogEJB_Finished-1.0-SNAPSHOT/echo-socket');

    this.subject.subscribe(
      msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );

    this.user = JSON.parse(localStorage.getItem('loggedUser'));

    this.visitedUser = JSON.parse(localStorage.getItem('visitedUser'));

    this.refresh();
  }

  get f() {
    return this.startPage.controls;
  }

  search() {
    this.startpageService.search(this.f.searchedKweet.value).subscribe(data => {
      this.searchedKweets = data;
    });
  }

  createKweet() {
    this.f.createdKweet;
    this.startpageService.createTweet(this.f.createdKweet.value, this.user.userId).subscribe(createdkweet => {
      this.kweets.push(createdkweet);
      this.subject.next(createdkweet);
    });

    this.ref.detectChanges();
  }

  refresh() {
    this.startpageService.GetTimeline(this.user.userId).subscribe(data => {
      this.kweets = data;
      this.ref.detectChanges();
    });
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
