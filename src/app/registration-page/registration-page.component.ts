import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  constructor() { }
  registrationForm: FormGroup;
  hide = true;
  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.max(20)),
      newEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(5)] ),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)] ),
      });
  }

  submit() {

  }
}
