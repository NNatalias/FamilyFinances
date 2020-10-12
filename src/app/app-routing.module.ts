import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthService} from './services/auth.service';
import {AuthPageComponent} from './auth-page/auth-page.component';
import {AuthGuard} from './guards/auth.guard';
import {AccPageComponent} from './acc-page/acc-page.component';

const routes: Routes = [
   { path: '', component: AuthPageComponent, children: [
       {path: 'login', redirectTo: '/', pathMatch: 'full'}] },
   { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'account', component: AccPageComponent, canActivate: [AuthGuard]},
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
