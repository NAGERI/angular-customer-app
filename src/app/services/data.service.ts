import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  API_ALL_ACCOUNTS,
  API_GET_ONE_CUSTOMER,
  API_REGISTER_CUSTOMER,
} from '../constants/index';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private customerUrl = API_GET_ONE_CUSTOMER;
  private accountsUrl = API_ALL_ACCOUNTS;
  private registerUrl = API_REGISTER_CUSTOMER;

  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get<any[]>(this.customerUrl);
  }

  getAccounts(id: number) {
    return this.http.get<any[]>(`${this.accountsUrl}/${id}`);
  }

  register(registerData: any) {
    return this.http.post(this.registerUrl, registerData);
  }
}
