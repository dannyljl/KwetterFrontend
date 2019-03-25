import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {LoginService} from '../login.service';
import {User} from '../../Models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  username = new FormControl('');
  password = new FormControl('');

  user: User;

  constructor(private formbuilder: FormBuilder, private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() {return this.loginForm.controls; }

  onSubmit() {
    console.log(this.f.username.value + this.f.password.value);
    this.user = new User();
    this.user.username = this.f.username.value;
    this.user.password = this.f.password.value;
    this.loginService.Login(this.user)
      .subscribe(
        data => {
          console.log(this.username = data.username);
        }
      );
  }

}
