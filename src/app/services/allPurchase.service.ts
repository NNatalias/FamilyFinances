import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Purchase} from '../Interfaces/Purchase';

@Injectable({providedIn: 'root'})
export class AllPurchaseService{
  constructor(private http: HttpClient) {
  }
  getAll(): Observable<Purchase[]>{
    return this.http.get(`${environment.fbDataBaseUrl}/purchases.json`)
      .pipe(map( (response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }));
      }));
  }
  remove(id: string): Observable<void>{
    return this.http.delete<void>(`${environment.fbDataBaseUrl}/purchases/${id}.json`);
  }
}
