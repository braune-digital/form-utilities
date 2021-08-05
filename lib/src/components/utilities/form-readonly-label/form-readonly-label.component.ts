import { Component, Inject, OnInit } from '@angular/core';
import { FormUtilitiesOptions } from '../../../form-utilities.module';

@Component({
  selector: 'bd-form-readonly-label',
  templateUrl: './form-readonly-label.component.html',
})
export class FormReadonlyLabelComponent implements OnInit {

  constructor(@Inject('FormUtilitiesOptions') public options: FormUtilitiesOptions) { }

  ngOnInit(): void {
  }

}
