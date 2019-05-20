import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-beer',
  templateUrl: './order-beer.component.html',
  styleUrls: ['./order-beer.component.css']
})
export class OrderBeerComponent implements OnInit {

  form: FormGroup;
  types = [
    { label: 'Lager', value: 'LAGER' },
    { label: 'Pilsen', value: 'PILSEN' },
    { label: 'Ipa', value: 'IPA' }
  ]

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.form = this.builder.group({
      id: [],
      name: this.builder.control('', Validators.required),
      type: this.builder.control('PILSEN', Validators.required),
      volume: this.builder.control('', Validators.required),
      imagePath: ''
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
    console.log(this.form.value)
  }

  update() {

  }

  reset() {
    this.form.reset();
  }

  get isUpdate() {
    return this.form.get('id').value;
  }

}
