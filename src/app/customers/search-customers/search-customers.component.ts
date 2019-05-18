import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {

  name: string = '';
  customers: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.search();
  }

  search() {
    this.customerService.findByName(this.name).subscribe(customers => this.customers = customers);
  }

}
