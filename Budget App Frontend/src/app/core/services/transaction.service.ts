import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'http://localhost:5050';
  private transactionsSubject = new BehaviorSubject<any[]>([]); // Хранение актуальных данных
  transactions$ = this.transactionsSubject.asObservable(); // Подписка на изменения

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Загрузка транзакций и обновление BehaviorSubject
  // GET /user/transactions
  getAllTransactionsService(): void {
    const headers = this.authService.getAuthHeaders();
    this.http.get<any[]>(`${this.baseUrl}/transaction/user`, { headers }).subscribe({
      next: (transactions) => {
        this.transactionsSubject.next(transactions); // Обновляем данные
      },
      error: (err) => {
        console.error('Error loading transactions:', err);
      },
    });
  }

  // POST /transaction
  addTransactionService(transaction: {
    type: string;
    amount: number;
    date: string;
    category: string;
  }): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/transaction`, transaction, { headers }).pipe(
      tap(() => this.getAllTransactionsService()) // Обновляем данные после добавления
    );
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
    updatedTransaction: any
  ): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put(`${this.baseUrl}/transaction/${id}`, updatedTransaction, { headers }).pipe(
      tap(() => this.getAllTransactionsService()) // Обновляем данные после добавления
    );
  }

  // DELETE /transaction/:id
  deleteTransactionService(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    console.log('Sending DELETE request to:', `${this.baseUrl}/transaction/${id}`);
    console.log('Headers:', headers);
    return this.http.delete(`${this.baseUrl}/transaction/${id}`, { headers, observe: 'response' }).pipe(
      map((response) => {
        if (response.status === 204 || response.status === 200) {
          return true;
        }
        throw new Error(`Unexpected status code: ${response.status}`);
      }),
      catchError((error) => {
        console.error('Error deleting transaction:', error);
        return throwError(error);
      })
    );
  }
}


