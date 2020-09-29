import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegistrationNewBuy} from '../Interfaces/registrationNewBuy';

@Injectable({providedIn: 'root'})
export class NewPurchaseService {
  constructor(private http: HttpClient) {}

  create(newRegistration: RegistrationNewBuy): Observable<RegistrationNewBuy>{
    return this.http.post<RegistrationNewBuy>('', newRegistration);
  }

}
