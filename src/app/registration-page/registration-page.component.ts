import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {RegistrationUser} from '../Interfaces/registrationUser';
import {SnackBarService} from '../services/snackBar.service';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  submitted = false;
  registrationForm: FormGroup;
  hide = true;
  constructor(public auth: AuthService, private router: Router, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      newEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(5)] ),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)] ),
      });
  }
  submit(): void {
    if (this.registrationForm.invalid){
      return;   }
    this.submitted = true;
    const registrationUser: RegistrationUser = {
      email : this.registrationForm.value.newEmail,
      password : this.registrationForm.value.newPassword,
    };
    this.auth.registrationNewUser(registrationUser).subscribe(() => {
      this.registrationForm.reset();
      this.router.navigate(['/home']);
      this.snackBarService.openSnackBar('Поздравляем Вы зарегистрировались !');
    });
    this.submitted = false;
  }
}
