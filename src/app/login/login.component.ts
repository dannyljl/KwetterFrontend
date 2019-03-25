import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  username = new FormControl('');
  password = new FormControl('');

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
  }

}
