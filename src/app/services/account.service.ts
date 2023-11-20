import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../constants/index';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAccounts(id: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiServerUrl}/accounts/${id}`);
  }

  public addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiServerUrl}/accounts`, account);
  }

  public depositOnAccount(accountId: number, amount: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiServerUrl}/accounts/${accountId}/deposit?amount=${amount}`,
      amount
    );
  }
  public balanceOnAccount(accountId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiServerUrl}/accounts/balance/${accountId}`
    );
  }
  public withdrwaFromAccount(
    accountId: number,
    amount: number
  ): Observable<any> {
    return this.http.post<any>(
      `${this.apiServerUrl}/accounts/${accountId}/withdraw?amount=${amount}`,
      amount
    );
  }
  public transferToAccount(
    fromAccountId: any,
    toAccountId: any,
    amount: any
  ): Observable<any> {
    return this.http.post<any>(
      `${this.apiServerUrl}/accounts/transfer/${amount}?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}`,
      amount
    );
  }
  public updateAccount(
    account: Account,
    accountId: number
  ): Observable<Account> {
    return this.http.put<Account>(
      `${this.apiServerUrl}/accounts/update/${accountId}`,
      account
    );
  }

  public deleteAccount(accountId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/accounts/delete/${accountId}`
    );
  }
}
