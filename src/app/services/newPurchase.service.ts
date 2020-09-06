import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Registration} from '../Interfaces/registration';

@Injectable({providedIn: 'root'})
export class NewPurchaseService {
  constructor(private http: HttpClient) {}

  create(newRegistration: Registration): Observable<Registration>{
    return this.http.post<Registration>('', newRegistration);
  }

}
