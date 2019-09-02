import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Inject, Input, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';

/**
 * @deprecated use rte component
 */
@Component({
  moduleId: module.id,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CkeditorComponent),
    multi: true
  }],
  selector: 'bd-ckeditor',
  templateUrl: './ckeditor.component.html'
})
export class CkeditorComponent extends FormInputComponent{

  @ViewChild(DefaultValueAccessor)
  input: DefaultValueAccessor;

  @Input()
  ckeditorConfig: {} = {};

  @Input()
  inputClass: string;

  @Input()
  label: string;

  @Input()
  placeholder = '';

  @Input()
  disableErrors = false;

  @Input()
  formControl: FormControl;

  onChange: (_: any) => void;
  onTouched: () => void;

  constructor(@Inject('FormUtilitiesOptions') protected _options:FormUtilitiesOptions, public formErrorService: FormErrorService) {
    super(_options);
  }

  writeValue(writeValue){}

  registerOnChange(fn: (_: any) => void): void {}

  registerOnTouched(fn: () => void): void {}

  setDisabledState(isDisabled: boolean): void {}

}
