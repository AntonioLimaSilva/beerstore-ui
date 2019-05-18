import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {

  name: string = '';
  customers: Customer[];

  constructor(
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.search();
  }

  search() {
    this.customerService.findByName(this.name).subscribe(customers => this.customers = customers);
  }

  notification(customer: Customer) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja exluir esse recurso',
      accept: () => {
        this.customerService.delete(customer.id).subscribe(() => {
          this.messageService.add({ severity: 'success', detail: 'Recurso excluído com sucesso' })

          this.search();
        });
      }
    })
  }

}
