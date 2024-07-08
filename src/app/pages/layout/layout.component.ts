import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  customer_balance = 0;
  private id: any | 1;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts() {
    this.id = localStorage.getItem('id');
    this.accountService.balanceOnAccount(this.id).subscribe({
      next: (data: any) => {
        this.customer_balance = data;
        console.log(this.customer_balance);
      },
      error: (error) => {
        console.error('Error fetching account details:', error);
        localStorage.clear();
      },
    });
  }
}
