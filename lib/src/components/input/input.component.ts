import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';

@Component({
  moduleId: module.id,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }],
  selector: 'bd-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends FormInputComponent implements ControlValueAccessor {
  @ViewChild(DefaultValueAccessor)
  input: DefaultValueAccessor;

  @Input()
  label: string;

  @Input()
  type = 'text';

  @Input()
  placeholder = '';

  @Input()
  disableErrors = false;

  @Input()
  formControl: FormControl;

  constructor(public formErrorService: FormErrorService) {
    super();
  }
}
