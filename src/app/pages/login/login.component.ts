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
  loginObj: any = {
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
    this.loginObj = {
      customer_id: this.loginObj.customer_id,
      customer_pin: this.loginObj.customer_pin,
    };
    this.http
      .post<any>(`${environment.apiBaseUrl}/auth/login`, this.loginObj)
      .subscribe(
        (res) => {
          console.log(res.token);
          if (res) {
            this.router.navigate(['/dashboard']);
            localStorage.clear();
            localStorage.setItem('id', res.token);
            // alert('login Success');
          } else {
            console.log(res);
            alert('Login failed. Please Try Again.');
          }
        },
        (error) => {
          // Handle error from the HTTP request
          console.error('Error during Login:', error);
          alert('Login failed. Please Try Again.');
        }
      );
  }
}
