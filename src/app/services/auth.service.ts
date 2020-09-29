import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserLogin} from '../Interfaces/userLogin';
import {Observable, pipe, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import set = Reflect.set;
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }
  get token(): string{
    return '';
  }
 login(userLogin: UserLogin): Observable<any>{
   return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, userLogin)
   .pipe(
     tap(this.setToken),
     catchError(this.handleError.bind(this))
   );
}
  logOut(): void{

  }
  isAuthenticated(): boolean{
   return !!this.token;
  }
  private setToken(responce){
console.log(responce);
  }
  private handleError(error: HttpErrorResponse){
    const {message} = error.error.error;
    return throwError(error);
  }
}
