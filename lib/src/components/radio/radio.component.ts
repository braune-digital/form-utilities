import { FormInputComponent } from '../form-input.component';
import {
  FormControl, FormGroup,
} from '@angular/forms';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';

@Component({
  moduleId: module.id,
  selector: 'bd-radio',
  templateUrl: './radio.component.html'
})
export class RadioComponent extends FormInputComponent implements OnInit {

  input: any;

  @Input()
  label: string;

  @Input()
  inputClass: string;

  @Input()
  disableErrors = false;

  @Input()
  placeholder: string;

  @Input()
  fieldName: string;

  @Input()
  radioOptions: {value: string, label: string}[];

  @Input()
  formControl: FormControl;

  @Input()
  control: FormControl;

  @Input()
  group: FormGroup;

  constructor(@Inject('FormUtilitiesOptions') protected _options: FormUtilitiesOptions,
              public formErrorService: FormErrorService
  ) {
    super(_options);
  }


  ngOnInit(): void {
    super.ngOnInit();
  }
}
