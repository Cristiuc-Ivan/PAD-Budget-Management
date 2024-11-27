import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'http://localhost:5050';

  constructor(private http: HttpClient) {}

  // Utility method to get auth token from localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Utility method to create headers with the auth token
  private createAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error('Authorization token is missing');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // POST /transaction
  addTransactionService(transaction: {
    type: string;
    amount: number;
    date: string;
    category: string;
  }): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post(`${this.baseUrl}/transaction`, transaction, { headers });
  }

  // GET /user/transactions
  getAllTransactionsService(): Observable<any[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/user/transactions`, { headers });
  }

  // GET /transaction/:id
  getTransactionByIdService(id: number): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/transaction/${id}`, { headers });
  }

  // GET /transactions?filter={filterType}
  filterTransactionsByTypeService(filterType: string): Observable<any[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/transactions`, {
      headers,
      params: new HttpParams().set('filter', filterType),
    });
  }

  // GET /transactions?filter=custom&startDate={startDate}&endDate={endDate}
  filterTransactionsByCustomDateService(
    startDate: string,
    endDate: string
  ): Observable<any[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/transactions`, {
      headers,
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
    const headers = this.createAuthHeaders();
    return this.http.put(`${this.baseUrl}/transaction/${id}`, updatedTransaction, { headers });
  }

  // DELETE /transaction/:id
  deleteTransactionService(id: number): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.delete(`${this.baseUrl}/transaction/${id}`, { headers });
  }
}

