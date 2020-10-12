import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserData} from '../Interfaces/registrationUser';
import {SnackBarService} from '../services/snackBar.service';
import {AuthService} from '../services/auth.service';
import {UserPersonalDataService} from '../services/userPersonalData.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-acc-page',
  templateUrl: './acc-page.component.html',
  styleUrls: ['./acc-page.component.css']
})
export class AccPageComponent implements OnInit {
  dataUserForm: FormGroup;
  @ViewChild('f') MyNgForm;
  constructor(private snackBarService: SnackBarService,
              public authS: AuthService,
              private userPersonalDataService: UserPersonalDataService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataUserForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.max(20)]),
  });
  }

  submit(): void {
    if (this.dataUserForm.invalid){
      return;   }
    const userData: UserData = {
      displayName : this.dataUserForm.value.firstName,
      idToken: this.authS.token
    };
    this.userPersonalDataService.registrationDataUser(userData).subscribe(() => {
      this.MyNgForm.resetForm();
      this.snackBarService.openSnackBar('Ваши данные успешно добавлены');
    }, error => {
      console.log(error);
      this.snackBarService.openSnackBar('Ошибка сервера!');
    });
  }

  delete(event: Event): void {
    this.authS.removeUser().subscribe(() => {
      event.preventDefault();
      this.authS.logOut();
      this.router.navigate(['login']);
    }, error => {
      console.log(error);
      this.snackBarService.openSnackBar('Ошибка сервера!');
    });
  }
}
