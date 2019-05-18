import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { LoginComponent } from './security/login/login.component';
import { OrderUserComponent } from './user/order-user/order-user.component';
import { SearchUsersComponent } from './user/search-users/search-users.component';
import { OrderCustomerComponent } from './customers/order-customer/order-customer.component';
import { SearchCustomersComponent } from './customers/search-customers/search-customers.component';
import { combineAll } from 'rxjs/operators';

export const ROUTES: Routes = [ 
    { path: '', component: AppComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users/novo', component: OrderUserComponent },
    { path: 'users/:id', component: OrderUserComponent },
    { path: 'users', component: SearchUsersComponent },
    { path: 'customers/novo', component: OrderCustomerComponent },
    { path: 'customers', component: SearchCustomersComponent },
    { path: 'customers/:id', component: OrderCustomerComponent }
    
]