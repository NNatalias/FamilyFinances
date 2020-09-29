import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {HomeComponent} from './home/home.component';
import {AuthService} from './services/auth.service';
import {AuthPageComponent} from './auth-page/auth-page.component';

const routes: Routes = [
   { path: '', component: AuthPageComponent, children: [
       {path: 'login', redirectTo: '/', pathMatch: 'full'}] },
   { path: 'home', component: HomeComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
