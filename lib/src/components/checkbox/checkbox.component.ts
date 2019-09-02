import { FormInputComponent } from '../form-input.component';
import {
  CheckboxControlValueAccessor,
  ControlValueAccessor, DefaultValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {Component, EventEmitter, forwardRef, Inject, Input, Output, ViewChild} from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';
import {noop} from 'rxjs';

@Component({
  moduleId: module.id,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }],
  selector: 'bd-checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent extends FormInputComponent implements ControlValueAccessor {
  @ViewChild(CheckboxControlValueAccessor)
  input: CheckboxControlValueAccessor;
  @Input()
  label: string;
  @Input()
  placeholder = '';
  @Input()
  inputClass: string;

  @Input()
  disableErrors = false;

  @Input()
  disabled = false;

  @Input()
  formControl: FormControl;

  @Output()
  onChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  isChecked = false;

  constructor(@Inject('FormUtilitiesOptions') protected _options:FormUtilitiesOptions, public formErrorService: FormErrorService) {
    super(_options);
  }

  get value(): any {
    return this.isChecked;
  }

  // set accessor including call the onchange callback
  set value(value: any) {
    this.isChecked = value;
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  writeValue(value: any): void {
    if (value !== this.isChecked) {
      this.isChecked = value;
    }
  }

  onInputChange(isChecked) {
    this.value = isChecked;
    this.onChange.emit(this.isChecked);
    this.onChangeCallback(this.value);
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
