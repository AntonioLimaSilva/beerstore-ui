import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/customers`;
  }

  add(customer: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<any>(this.url, customer, { headers });
  }

  update(customer: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.put<any>(`${this.url}/${customer.id}`, customer, { headers })
  }

  delete(id: number):  Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`)
  }

}
