import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Purchase} from '../Interfaces/Purchase';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {FbCreateResponse} from '../Interfaces/FbCreateResponse';

@Injectable({providedIn: 'root'})
export class NewPurchaseService {
  constructor(private http: HttpClient) {}

  create(newRegistration: Purchase): Observable<Purchase>{
    return this.http.post(`${environment.fbDataBaseUrl}/purchases.json`,
      newRegistration).pipe(map((response: FbCreateResponse) => {
        return {
          ...newRegistration,
          id: response.name,
          date: new Date(newRegistration.date),
        };
      }));
  }
}
