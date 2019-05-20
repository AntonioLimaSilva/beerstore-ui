import { Component, OnInit, Output, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements ControlValueAccessor {

  form: FormGroup;

  @Input() label: string;
  @Input() options: any[];
  @Input() formControlName: FormControlName

  value: any
  onChange: any

  setValue(value: any){
    this.value = value
    this.onChange(this.value)
  }

  writeValue(obj: any): void {
    this.value = obj
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

}
