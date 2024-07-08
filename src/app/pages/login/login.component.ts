import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  title: String = 'Customer';
  loginForm: any = {
    customer_id: '',
    customer_pin: '',
  };
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  hideshowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  constructor(private http: HttpClient, private router: Router) {}

  onLoginSubmit() {
    this.loginForm = {
      customer_id: this.loginForm.customer_id,
      customer_pin: this.loginForm.customer_pin,
    };
    this.http
      .post<any>(`${environment.apiBaseUrl}/auth/login`, this.loginForm)
      .subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('id', response.token);
          this.router.navigate(['/dashboard']);
          // alert('login Success');
        },
        error: (error) => {
          console.log(error);
          alert('Login failed. Please Try Again.');
        },
      });
  }
}
