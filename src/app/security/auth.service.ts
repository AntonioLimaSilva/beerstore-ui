import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthorizationRequest } from './authorization.request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.url = `${environment.apiUrl}/api/auth/signin`
    this.tokenLoad()
  }

  login(autorizationRequest: AuthorizationRequest): Observable<void> {

    return this.http.post<any>(`${this.url}`, autorizationRequest)
      .pipe(map(response => {
        this.tokenStorage(response.accessToken)
    }))

  }

  removeAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  tokenStorage(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token)
  }

  tokenLoad() {
    const token = localStorage.getItem('token');

    if(token) {
      this.tokenStorage(token);
    }
  }

}
