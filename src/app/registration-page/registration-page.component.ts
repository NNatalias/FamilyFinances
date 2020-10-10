import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {RegistrationUser} from '../Interfaces/registrationUser';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }
  registrationForm: FormGroup;
  hide = true;
  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      // firstName: new FormControl(null, Validators.required),
      // lastName: new FormControl(null, Validators.max(20)),
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
    const registrationUser: RegistrationUser = {
      email : this.registrationForm.value.newEmail,
      password : this.registrationForm.value.newPassword,
    };
    this.auth.registrationNewUser(registrationUser).subscribe(() => {
      this.registrationForm.reset();
      this.router.navigate(['/home']);
    });
  }
}
