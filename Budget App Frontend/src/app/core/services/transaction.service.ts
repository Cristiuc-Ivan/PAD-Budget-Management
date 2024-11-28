import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'http://localhost:5050';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // POST /transaction
  addTransactionService(transaction: {
    type: string;
    amount: number;
    date: string;
    category: string;
  }): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    console.log('Sending POST request to:', `${this.baseUrl}/transaction`);
    console.log('Payload:', transaction);
    console.log('Headers:', headers);
    return this.http.post(`${this.baseUrl}/transaction`, transaction, { headers });
  }

  // GET /user/transactions
  getAllTransactionsService(): Observable<any[]> {
    const headers = this.authService.getAuthHeaders();
    console.log('Sending GET request to:', `${this.baseUrl}/user/transactions`);
    console.log('Headers:', headers);
    return this.http.get<any[]>(`${this.baseUrl}/user/transactions`, { headers });
  }

  // GET /transaction/:id
  getTransactionByIdService(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    console.log('Sending GET request to:', `${this.baseUrl}/transaction/${id}`);
    console.log('Headers:', headers);
    return this.http.get<any>(`${this.baseUrl}/transaction/${id}`, { headers });
  }

  // GET /transactions?filter={filterType}
  filterTransactionsByTypeService(filterType: string): Observable<any[]> {
    const headers = this.authService.getAuthHeaders();
    const params = new HttpParams().set('filter', filterType);
    console.log('Sending GET request to:', `${this.baseUrl}/transactions`);
    console.log('Params:', params.toString());
    console.log('Headers:', headers);
    return this.http.get<any[]>(`${this.baseUrl}/transactions`, { headers, params });
  }

  // GET /transactions?filter=custom&startDate={startDate}&endDate={endDate}
  filterTransactionsByCustomDateService(
    startDate: string,
    endDate: string
  ): Observable<any[]> {
    const headers = this.authService.getAuthHeaders();
    const params = new HttpParams()
      .set('filter', 'custom')
      .set('startDate', startDate)
      .set('endDate', endDate);
    console.log('Sending GET request to:', `${this.baseUrl}/transactions`);
    console.log('Params:', params.toString());
    console.log('Headers:', headers);
    return this.http.get<any[]>(`${this.baseUrl}/transactions`, { headers, params });
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
    const headers = this.authService.getAuthHeaders();
    console.log('Sending PUT request to:', `${this.baseUrl}/transaction/${id}`);
    console.log('Payload:', updatedTransaction);
    console.log('Headers:', headers);
    return this.http.put(`${this.baseUrl}/transaction/${id}`, updatedTransaction, { headers });
  }

  // DELETE /transaction/:id
  deleteTransactionService(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    console.log('Sending DELETE request to:', `${this.baseUrl}/transaction/${id}`);
    console.log('Headers:', headers);
    return this.http.delete(`${this.baseUrl}/transaction/${id}`, { headers });
  }
}


