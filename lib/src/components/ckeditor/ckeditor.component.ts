import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Inject, Input, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { CKEditorComponent } from 'ng2-ckeditor';
import { FormUtilitiesOptions } from '../../form-utilities.module';


@Component({
  moduleId: module.id,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CkeditorComponent),
    multi: true
  }],
  selector: 'bd-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss']
})
export class CkeditorComponent extends FormInputComponent implements ControlValueAccessor {

  @ViewChild(DefaultValueAccessor)
  input: DefaultValueAccessor;

  @ViewChild(CKEditorComponent)
  editor: CKEditorComponent;

  @Input()
  ckeditorConfig: {} = {
    'skin': 'moono-lisa',
    'toolbar': [
      {
        name: 'bd-form', items: ['Format', '-', 'Source', '-', 'Bold','Italic','Underline','StrikeThrough','-','NumberedList','BulletedList','-','JustifyLeft','JustifyCenter','JustifyRight','-','Link' ]
      }
    ]
  };

  @Input()
  label: string;

  @Input()
  placeholder: string = '';

  @Input()
  disableErrors = false;

  @Input()
  formControl: FormControl;

  onChange: (_: any) => void;
  onTouched: () => void;

  constructor(@Inject('options') private options:FormUtilitiesOptions, public formErrorService: FormErrorService) {
    super(options);
  }

  onEditorChange(_value:any): void {
    this.onChange(_value);
  }

  writeValue(value: any): void {
    this.editor.value = value;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.input.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.input.setDisabledState(isDisabled);
  }

}
