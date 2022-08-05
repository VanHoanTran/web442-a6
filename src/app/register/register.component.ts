import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = {
    userName: '',
    password: '',
    password2: ''
  };
  warning: string = '';
  success: boolean = false;
  loading: boolean = false;


  private registerSub: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }
  
  onSubmit(f: NgForm): void {

    if (
      this.registerUser.userName != '' &&
      this.registerUser.password != '' &&
      this.registerUser.password2 != ''
    ) {
      this.loading = true;
      this.registerSub = this.authService.register(this.registerUser).subscribe(
        (success) => {;
          this.warning = '';
          this.success = true;
          this.loading = false;
        },
        (err) => {
          this.warning = err.error.message;
          this.success = false;
          this.loading = false;
        }
      );
    }
  }


  ngOnDestry(){
    this.registerSub?.unsubcribe();
  }
}
