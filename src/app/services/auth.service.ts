import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthResponse, UserLogin} from '../Interfaces/userLogin';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) {
  }
  get token(): string{
    const expDate = new Date(localStorage.getItem('FB-token-exp'));
    if (new Date() > expDate){
      this.logOut();
      return null;
    }

    return localStorage.getItem('FB-token');
  }
 login(userLogin: UserLogin): Observable<any>{
    userLogin.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, userLogin)
   .pipe(
     tap(this.setToken),
     catchError(this.handleError.bind(this))
   );
}
  logOut(): void{
    this.setToken(null);
  }
  isAuthenticated(): boolean{
   return !!this.token;
  }
  private setToken(response: FbAuthResponse | null): void{
    if (response){
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('FB-token', response.idToken);
      localStorage.setItem('FB-token-exp', expDate.toString());
    }else { localStorage.clear(); }
  }
  private handleError(error: HttpErrorResponse): Observable<any>{
    const {message} = error.error.error;
    switch (message){
      case 'INVALID_EMAIL':
      this.error$.next('лол');
      break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого пользователя нет');
        break;
    }
    return throwError(error);
  }
}
