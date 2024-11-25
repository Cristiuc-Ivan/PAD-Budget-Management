import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'http://localhost:5050';

  constructor(private http: HttpClient) {}

  // POST /transaction
  addTransactionService(transaction: {
    type: string;
    amount: number;
    date: string;
    category: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/transaction`, transaction);
  }

  // GET /user/transactions
  getAllTransactionsService(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/transactions`);
  }

  // GET /transaction/:id
  getTransactionByIdService(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/transaction/${id}`);
  }

  // GET /transactions?filter={filterType}
  filterTransactionsByTypeService(filterType: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transactions`, {
      params: new HttpParams().set('filter', filterType),
    });
  }

  // GET /transactions?filter=custom&startDate={startDate}&endDate={endDate}
  filterTransactionsByCustomDateService(
    startDate: string,
    endDate: string
  ): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transactions`, {
      params: new HttpParams()
        .set('filter', 'custom')
        .set('startDate', startDate)
        .set('endDate', endDate),
    });
  }

  // PUT /transaction/:id
  updateTransactionService(
    id: number,
    updatedTransaction: {
      type: string;
      amount: number;
      date: string;
      category: string;
    }
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/transaction/${id}`, updatedTransaction);
  }

  // DELETE /transaction/:id
  deleteTransactionService(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/transaction/${id}`);
  }
}

