import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
   // { path: 'first-component', component: FirstComponent },
  // { path: 'second-component', component: SecondComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
