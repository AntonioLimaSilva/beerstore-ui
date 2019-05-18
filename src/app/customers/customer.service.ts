import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/customers`;
  }

  add(customer: Customer): Observable<Customer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<Customer>(this.url, customer, { headers });
  }

  update(customer: Customer): Observable<Customer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.put<Customer>(`${this.url}/${customer.id}`, customer, { headers })
  }

  delete(id: number):  Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  findById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/${id}`)
  }

  findByName(name: string): Observable<Customer[]> {
    const params = new HttpParams({
      fromObject: {
        name: name
      }
    })
    return this.http.get<any>(`${this.url}`, { params }).pipe(map(response => response.content));
  }

}
