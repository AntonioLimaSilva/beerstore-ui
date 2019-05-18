import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { AuthService } from './security/auth.service';
import { LoginComponent } from './security/login/login.component';
import { environment } from 'src/environments/environment';
import { OrderUserComponent } from './user/order-user/order-user.component';
import { GroupService } from './group/group.service';
import { UserService } from './user/user.service';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { SidebarLeftComponent } from './core/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './core/sidebar-right/sidebar-right.component';
import { InputContentComponent } from './shared/input-content/input-content.component';
import { SearchUsersComponent } from './user/search-users/search-users.component';
import { HttpErrorHandler } from './http-error.handler';
import { OrderCustomerComponent } from './customers/order-customer/order-customer.component';
import { CustomerService } from './customers/customer.service';
import { SearchCustomersComponent } from './customers/search-customers/search-customers.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderUserComponent,
    FooterComponent,
    HeaderComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
    InputContentComponent,
    SearchUsersComponent,
    OrderCustomerComponent,
    SearchCustomersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    }),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    GroupService, 
    UserService,
    CustomerService,
    JwtHelperService,
    ConfirmationService,
    MessageService,
    AuthService,
    {
      provide: ErrorHandler, useClass: HttpErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
