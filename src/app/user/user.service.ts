import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/users`
   }

  getAll(nome: string): Observable<User[]> {
    let params = new HttpParams().set('nome', nome);

    return this.http.get<any>(`${this.url}`,  { params }).pipe(map(response => response.content))
  }

  add(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<User>(`${this.url}`, user, { headers })
  }

  put(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return this.http.put<User>(`${this.url}/${user.id}`, user, { headers })
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);

  }

  delete(id: number): Observable<void> {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(map(() => null));
  }
}
