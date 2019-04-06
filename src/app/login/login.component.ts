import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {User} from '../../Models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  username: string;
  password: string;

  user: User;

  constructor(private formbuilder: FormBuilder, private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() {return this.loginForm.controls; }

  onSubmit() {
    this.user = new User();
    this.user.username = this.f.username.value;
    this.user.password = this.f.password.value;
    this.loginService.Login(this.user)
      .subscribe(
        data => {
          if (data !== null) {
            this.user = data;
            localStorage.setItem('loggedUser', JSON.stringify(this.user));
            localStorage.setItem('visitedUser', JSON.stringify(this.user));
            this.router.navigate(['startpage']);
          }
        }
      );
  }

}
