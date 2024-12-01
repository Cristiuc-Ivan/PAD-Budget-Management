import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'http://localhost:5050/currency-rates'; // URL микросервиса

  constructor(private http: HttpClient) {}

  getCurrencyRates(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(this.apiUrl);
  }
}
