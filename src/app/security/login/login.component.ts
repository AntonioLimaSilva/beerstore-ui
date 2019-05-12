import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthorizationRequest } from '../authorization.request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authorizationRequest = new AuthorizationRequest();

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.authorizationRequest).subscribe(() => {
        this.router.navigate(['/users']);
      },
      err => {
        throw err;
      });
  }

}
