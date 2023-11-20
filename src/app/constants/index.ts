import { environment } from 'src/environments/environment.development';

export const API_GET_ONE_CUSTOMER = `${environment.apiUrl}/customers/1`;

export const API_ALL_ACCOUNTS = `${environment.apiUrl}/accounts`;

export const API_GET_ALL_TRANSACTIONS = `${environment.apiUrl}/transactions/1`;

export const API_REGISTER_CUSTOMER = `${environment.apiUrl}/auth/register`;

export interface Account {
  id: number;
  accountNumber: string;
  openingDate: Date;
  balance: number;
  customer: [];
  transactions: [];
}

export interface Transaction {
  id: number;
  transaction_id: string;
  account: [];
  transactionType: string;
  transactionAmount: number;
  transactionDate: string;
}

export interface Customer {
  id: number;
  customer_pin: string;
  name: string;
  email: string;
  customer_id: string;
  accounts: [];
}
