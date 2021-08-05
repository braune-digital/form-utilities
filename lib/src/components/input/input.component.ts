import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {Component, EventEmitter, forwardRef, Inject, Input, Output, ViewChild} from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }],
  selector: 'bd-input',
  templateUrl: './input.component.html'
})
export class InputComponent extends FormInputComponent implements ControlValueAccessor {

  @ViewChild(DefaultValueAccessor, {static: true})
  input: DefaultValueAccessor;

  @Input()
  label: string;

  @Input()
  inputClass: string;

  @Input()
  placeholder = '';

  @Input()
  autocomplete = '';

  @Input()
  type = 'text';

  @Input()
  step = '';

  @Input()
  disableErrors = false;

  @Input()
  formControl: FormControl;

  @Input()
  icon: string;

  @Input()
  readOnly = false;

  @Output()
  onInputKeypress: EventEmitter<string> = new EventEmitter();

  @Output()
  onInputChange: EventEmitter<string> = new EventEmitter();

  @Output()
  onInputKeyup: EventEmitter<string> = new EventEmitter();

  @Output()
  onFocus: EventEmitter<string> = new EventEmitter();

  @Output()
  onFocusOut: EventEmitter<string> = new EventEmitter();

  @Output()
  onIconClicked: EventEmitter<string> = new EventEmitter();

  constructor(@Inject('FormUtilitiesOptions') protected _options: FormUtilitiesOptions, public formErrorService: FormErrorService) {
    super(_options);
  }

  handleOnInputKeypress(value: string): void {
    this.onInputKeypress.emit(value);
  }

  handleOnInputChange(value: string): void {
    this.onInputChange.emit(value);
  }

  handleOnInputKeyup(value: string): void {
    this.onInputKeyup.emit(value);
  }

  handleOnFocus(value: string): void {
    this.focus = true;
    this.onFocus.emit(value);
  }

  handleOnFocusOut(value: string): void {
    this.focus = false;
    this.onFocusOut.emit(value);
  }

  handleIconClicked(event: any): void {
    this.onIconClicked.emit(event);
  }
}
