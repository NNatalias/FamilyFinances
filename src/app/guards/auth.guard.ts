import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private auth: AuthService,
              private router: Router) {
  }
canActivate(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  if (this.auth.isAuthenticated()){
    return true;
  }else {
    this.auth.logOut();
    this.router.navigate(['login'], {
      queryParams: {
        loginAgain: true
      }});
  }
}
}
