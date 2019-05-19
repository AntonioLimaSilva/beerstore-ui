import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
   
@Injectable({ providedIn: 'root' })
export class HttpErrorHandler extends ErrorHandler {

  constructor(
    private injector: Injector
  ) { 
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if(errorResponse instanceof HttpErrorResponse) {
      switch(errorResponse.status) {
        case 400:
        if(errorResponse.error.errors[0].code === 'bad-credentials') {
          this.injector.get(MessageService).add({severity: 'error', detail: 'Usuário não cadastrado'});
          break;
        }
        break;
        case 401:
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