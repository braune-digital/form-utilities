import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Inject, Input, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';

@Component({
  moduleId: module.id,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaComponent),
    multi: true
  }],
  selector: 'bd-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent extends FormInputComponent implements ControlValueAccessor {
  @ViewChild(DefaultValueAccessor)
  input: DefaultValueAccessor;

  @Input()
  label: string;

  @Input()
  placeholder = '';

  @Input()
  disableErrors = false;

  @Input()
  formControl: FormControl;

  @Input()
  autosize: boolean = true;

  constructor(@Inject('options') private options:FormUtilitiesOptions, public formErrorService: FormErrorService) {
    super(options);
  }
}
