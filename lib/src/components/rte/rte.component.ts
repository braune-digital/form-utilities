import { FormInputComponent } from '../form-input.component';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Inject, Input, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';


@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RteComponent),
    multi: true
  }],
  selector: 'bd-rte',
  templateUrl: './rte.component.html'
})
export class RteComponent extends FormInputComponent{

  @ViewChild(DefaultValueAccessor, {static: true})
  input: DefaultValueAccessor;

  @Input()
  rteConfig: {} = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['clean'],
      ['link']
    ]
  };

  @Input()
  label: string;

  @Input()
  help: string;

  @Input()
  inputClass: string;

  @Input()
  placeholder = '';

  @Input()
  disableErrors = false;

  @Input()
  formControl: FormControl;

  @Input()
  readOnly = false;

  onChange: (_: any) => void;
  onTouched: () => void;

  constructor(@Inject('FormUtilitiesOptions') protected _options:FormUtilitiesOptions, public formErrorService: FormErrorService) {
    super(_options);
  }

  writeValue(writeValue){

  }

  registerOnChange(fn: (_: any) => void): void {
  }

  registerOnTouched(fn: () => void): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

}
