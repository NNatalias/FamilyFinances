import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
   { path: '', component: LoginPageComponent, children: [
       {path: 'login', redirectTo: '/', pathMatch: 'full'}] },
   { path: 'home', component: HomeComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
