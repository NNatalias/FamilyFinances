import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserLogin} from '../Interfaces/userLogin';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  hide = true;
  submitted = false;

  constructor( private auth: AuthService, private router: Router) { }
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
   this.submitted = true;
   const userLogin: UserLogin = {
      email : this.loginForm.value.email,
      password : this.loginForm.value.password,
    };
   this.auth.login(userLogin).subscribe(() => {
     this.loginForm.reset();
     this.router.navigate(['/home']);
     this.submitted = false;
   });
  }
}
