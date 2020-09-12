import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  hide = true;

  constructor() { }
  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(5)] ),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)] ), });
  }

  submit(): void {
   if (this.loginForm.invalid){
     return;   }
  }
}
