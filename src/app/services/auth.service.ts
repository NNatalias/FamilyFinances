import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthResponse, UserLogin} from '../Interfaces/userLogin';
import {Observable, Subject, Subscription, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {RegistrationUser, UserData} from '../Interfaces/registrationUser';

@Injectable()
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  public errorReg$: Subject<string> = new Subject<string>();
  public errorDel$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('FB-token-exp'));
    if (new Date() > expDate) {
      this.logOut();
      return null;
    }
    return localStorage.getItem('FB-token');
  }

  get userId(): string {
    const userId = localStorage.getItem('FB-idUser');
    if (!userId) {
      this.logOut();
      return null;
    } else {
      return localStorage.getItem('FB-idUser');
    }
  }

  login(userLogin: UserLogin): Observable<any> {
    userLogin.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, userLogin)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logOut(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  registrationNewUser(registrationUser: RegistrationUser): Observable<any> {
    registrationUser.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, registrationUser)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  getUserData(): Observable< { kind: string, users: Array<UserData> }> {
    return this.http.post<{ kind: string, users: Array<UserData> }>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.apiKey}`,
      {idToken: this.token})
      .pipe(
      catchError(this.handleError.bind(this))
    );
  }

  removeUser(): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${environment.apiKey}`,
      {idToken: this.token}).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private setToken(response: FbAuthResponse | null): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('FB-token', response.idToken);
      localStorage.setItem('FB-idUser', response.localId);
      localStorage.setItem('FB-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    const {message} = error.error.error;
    switch (message) {
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого пользователя нет');
        break;
      case 'EMAIL_EXISTS':
        this.errorReg$.next('Пользователь с таким Email уже существует');
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        this.errorReg$.next('Мы заметили подозрительную активность, попробуйте позже');
        break;
      case 'INVALID_ID_TOKEN':
        this.errorDel$.next('Пожалуйста, перезайдите в систему');
        break;
      case 'USER_NOT_FOUND':
        this.errorDel$.next('Этот пользователь уже удален');
        break;
    }
    return throwError(error);
  }
}
