import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './security/auth.service';
import { Router } from '@angular/router';
   
@Injectable({ providedIn: 'root' })
export class HttpErrorHandler extends ErrorHandler {

  constructor(
    private messageService: MessageService,
    private injector: Injector
  ) { 
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if(errorResponse instanceof HttpErrorResponse) {
      switch(errorResponse.status) {
        case 400:
        if(errorResponse.error.error === 'invalid_grant') {
          this.messageService.add({severity: 'error', detail: 'Usuário não cadastrado'});
          break;
        }
        console.log('Nao esta caindo aqui');
        break;
        case 401:
          //this.router.navigate(['/login']);
          this.injector.get(Router).navigate(['/login'])
        console.log('Não autorizado');
        break;
        case 403:
        console.log('Acesso negado');
        break;
        case 404:
        console.log('Pagina não encontrada');
        break;
      }
    }
    super.handleError(errorResponse)
  }

}