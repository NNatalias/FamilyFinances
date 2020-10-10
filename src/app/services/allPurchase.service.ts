import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Purchase} from '../Interfaces/Purchase';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class AllPurchaseService{
  constructor(private http: HttpClient, private auth: AuthService) {
  }
  getAll(): Observable<Purchase[]>{
    return this.http.get(`${environment.fbDataBaseUrl}/purchases.json?orderBy="owner"&equalTo="${this.auth.userId}"`)
      .pipe(map( (response: {[key: string]: any | null}) => {
      if (response){
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }));
      }else {
        return [];
      }
      }));
  }
  remove(id: string): Observable<void>{
    return this.http.delete<void>(`${environment.fbDataBaseUrl}/purchases/${id}.json`);
  }
}
