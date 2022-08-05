/*********************************************************************************
 * WEB422 – Assignment 06
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
 * assignment has been copied manually or electronically from any other source (including web sites) or
 * distributed to other students.
 *
 * Name  : Van Hoan Tran Student ID: 138415203 Date: 08/05/2022
 *
 * Angular App (Deployed) Link: https://relaxed-croquembouche-d0f64e.netlify.app/login
 *
 * User API (Heroku) Link: https://hidden-reef-44552.herokuapp.com/api/user
 *
 ********************************************************************************/
import { Component,OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  searchString: string = '';
  title = 'web422-a4';
  token: any;
  constructor(private router: Router, private auth: AuthService) {}
  handleSearch() {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }
  ngOnInit(): void {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) { 
          this.token = this.auth.readToken();
        }
      });
  }

  logout(): void{
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
