import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Transaction } from 'src/app/constants';
import { AccountService } from '../../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashb',
  templateUrl: './dashb.component.html',
  styleUrls: ['./dashb.component.css'],
})
export class DashbComponent implements OnInit {
  TRANSACTIONS: Transaction[] = [
    {
      id: 0,
      account: [],
      transaction_id: '2340-9773-2349-3324',
      transactionDate: '01/02/2021',
      transactionAmount: 18985200,
      transactionType: 'Deposit',
    },
    {
      id: 1,
      account: [],
      transaction_id: '2343-2434-1232-9941',
      transactionDate: '01/02/2020',
      transactionAmount: 18985200,
      transactionType: 'Withdraw',
    },
    {
      id: 2,
      account: [],
      transaction_id: '2343-2434-1232-9941',
      transactionDate: '01/02/2020',
      transactionAmount: 18985200,
      transactionType: 'Withdraw',
    },
  ];

  searchText: string = '';
  mapToArray: any;
  accountNumber: any = 'ACCxxxxxxx';

  constructor(private accountService: AccountService) {}

  accountData$: any = [];
  transactions: any = [];
  public transferAccount: any = [];
  public accounts: any;
  public depositAccount: any;
  public withdrawAccount: any;
  private id: any | 1;

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts() {
    this.id = localStorage.getItem('id');
    this.accountService.getAccounts(this.id).subscribe({
      next: (data: any) => {
        this.accountData$ = data;
        this.transactions = data.transactions.reverse().splice(0, 10);
        this.accountNumber = data.accountNumber;
      },
      error: (error) => console.error('Error fetching accounts:', error),
    });
  }

  public onDeposit(depositForm: NgForm): void {
    this.id = localStorage.getItem('id');
    this.accountService
      .depositOnAccount(this.id, depositForm.value.amount)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          depositForm.reset();
          window.location.reload();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status > 300) {
            alert('Deposit Operation Failed');
          }
          depositForm.reset();
        },
      });
  }

  public onWithdraw(withdrawForm: NgForm): void {
    console.log('Withdraw Clicked', withdrawForm.value);
    this.accountService
      .withdrwaFromAccount(this.id, withdrawForm.value.amount)
      .subscribe(
        (response: any) => {
          console.log(response);
          withdrawForm.reset();
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          if (error.status > 300) {
            alert('Withdraw Operation Failed');
          }
          withdrawForm.reset();
        }
      );
  }

  // Transfer from another account to logged in one.
  public onTransfer(transferForm: NgForm): void {
    console.log('Transfer Clicked', transferForm.value);
    this.id = localStorage.getItem('id');
    this.accountService
      .transferToAccount(
        transferForm.value.fromAccountId,
        this.id,
        transferForm.value.amount
      )
      .subscribe({
        next: (response: void) => {
          console.log(response);
          transferForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status > 300) {
            alert('Transfer Operation Failed');
          }
          transferForm.reset();
        },
      });
  }

  public onOpenModal(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'deposit') {
      button.setAttribute('data-target', '#depositModal');
    }

    if (mode === 'withdraw') {
      button.setAttribute('data-target', '#withdrawModal');
    }
    if (mode === 'transfer') {
      button.setAttribute('data-target', '#transferModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
