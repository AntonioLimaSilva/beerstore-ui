import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.css']
})
export class OrderCustomerComponent implements OnInit {

  form: FormGroup;

  constructor(
    private build: FormBuilder,
    private customerService: CustomerService  
  ) { }

  ngOnInit() {
    this.form = this.build.group({
      id: [],
      name: this.build.control('', Validators.required),
      email: this.build.control('', Validators.required),
      cellphone: this.build.control('', Validators.required)
    })
  }

  save() {
    this.customerService.add(this.form.value).subscribe(customer => {
      console.log(customer)
    });
  }

}
