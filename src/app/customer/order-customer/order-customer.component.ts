import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.css']
})
export class OrderCustomerComponent implements OnInit {

  form: FormGroup;

  constructor(
    private build: FormBuilder,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id']

    if(id) {
      this.customerService.findById(id).subscribe(customer => this.form.setValue(customer))
    }

    this.form = this.build.group({
      id: [],
      name: this.build.control('', Validators.required),
      email: this.build.control('', Validators.required),
      cellphone: this.build.control('', Validators.required)
    })
  }

  save() {
    if (this.isUpdate) {
      this.update();
    } else {
      this.add();
    }
  }

  add() {
    this.customerService.add(this.form.value).subscribe(customer => {
      console.log(customer)
    });
  }

  update() {
    this.customerService.update(this.form.value).subscribe(customer => {
      console.log(customer)
    })
  }

  reset() {
    this.form.reset();
  }

  get isUpdate() {
    return this.form.get('id').value;
  }

}
