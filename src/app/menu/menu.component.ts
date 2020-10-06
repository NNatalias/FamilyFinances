import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
  }

  logout(event: Event): void{
    event.preventDefault();
    this.auth.logOut();
    this.router.navigate(['login']);
  }
}
