import { Injectable } from '@angular/core';
import { UserData} from '../Interfaces/registrationUser';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserPersonalDataService {
  constructor(private http: HttpClient) {
  }
  registrationDataUser(userData: UserData): Observable<any>{
    userData.returnSecureToken = false;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, userData);
  }
}
