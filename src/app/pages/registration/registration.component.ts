import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { Customer } from 'src/app/constants';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  public customer: any = {
    customer_id: '',
    customer_pin: '',
    email: '',
    id: null,
    name: '',
  };
  registerData = { firstName: '', lastName: '', email: '', customerId: '' };
  regData: any = {};
  title: String = 'Customer';

  constructor(private router: Router, private registerService: DataService) {}
  onRegisterSubmit() {
    const reg = (this.regData = {
      customer_id: this.registerData.customerId,
      email: this.registerData.email,
      name: this.registerData.firstName + ' ' + this.registerData.lastName,
    });

    this.registerService.register(reg).subscribe({
      next: (response: any) => {
        console.log('Register response', response);
        if (response) {
          this.router.navigate(['/dashboard']);
          this.customer.id = response.id;
          this.customer.customer_id = response.customer_id;
          this.customer.customer_pin = response.customer_pin;
          this.customer.email = response.email;
          this.customer.name = response.name;
          localStorage.clear();
          localStorage.setItem('id', response.id);
          localStorage.setItem('customer_email', response.email);
          localStorage.setItem('customer_pin', response.customer_pin);
          localStorage.setItem('customer_id', response.customer_id);
        } else {
          // Handle unsuccessful login (e.g., show error message)
          console.log(
            'Registration failed. Please check your credentials.',
            response
          );
          alert('Registration failed. Please Try Again.');
        }
      },
      error: (error) => {
        // Handle error from the HTTP request
        console.error('Error during Registration:', error);
        alert('Registration failed. Please Try Again.');
      },
    });
  }
}
