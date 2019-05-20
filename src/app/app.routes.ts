import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { LoginComponent } from './security/login/login.component';
import { OrderUserComponent } from './user/order-user/order-user.component';
import { SearchUsersComponent } from './user/search-users/search-users.component';
import { OrderCustomerComponent } from './customer/order-customer/order-customer.component';
import { SearchCustomersComponent } from './customer/search-customers/search-customers.component';
import { AuthGuard } from './security/auth.guard';
import { AccessDeniedComponent } from './core/access-denied/access-denied.component';
import { OrderBeerComponent } from './beer/order-beer/order-beer.component';

export const ROUTES: Routes = [ 
    { path: '',
      component: AppComponent 
    },
    { path: 'login', 
      component: LoginComponent 
    },
    {
      path: 'access-denied',
      component: AccessDeniedComponent
    },
    { path: 'users/novo',
      component: OrderUserComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['ROLE_ADD_USER'] }
    },
    { path: 'users/:id', 
      component: OrderUserComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['ROLE_READ_USER'] }
    },
    { path: 'users', 
      component: SearchUsersComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['ROLE_READ_USER'] }
    },
    { path: 'customers/novo', 
      component: OrderCustomerComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['ROLE_ADD_CUSTOMER'] }
    },
    { path: 'customers/:id', 
      component: OrderCustomerComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['ROLE_READ_CUSTOMER'] }
    },
    { path: 'customers',
      component: SearchCustomersComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['ROLE_READ_CUSTOMER'] }
    },
    {
      path: 'beers/novo',
      component: OrderBeerComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['ROLE_READ_BEER'] }
    }
]