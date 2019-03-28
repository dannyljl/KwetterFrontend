import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {User} from '../../Models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  username: string;
  password: string;

  user: User;

  constructor(private formbuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {return this.registerForm.controls; }

  onSubmit() {
    this.user = new User();
    this.user.username = this.f.username.value;
    this.user.password = this.f.password.value;
    this.loginService.Register(this.user)
      .subscribe(
        data => {
          if (data !== null) {
            this.router.navigate(['login']);
          }
        }
      );
  }


}
