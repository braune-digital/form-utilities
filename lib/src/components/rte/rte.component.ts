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
    useExisting: forwardRef(() => RteComponent),
    multi: true
  }],
  selector: 'bd-rte',
  templateUrl: './rte.component.html',
  styleUrls: ['./rte.component.scss']
})
export class RteComponent extends FormInputComponent{

  @ViewChild(DefaultValueAccessor)
  input: DefaultValueAccessor;

  @ViewChild(CKEditorComponent)
  editor: CKEditorComponent;

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

  onChange: (_: any) => void;
  onTouched: () => void;

  constructor(@Inject('options') private options:FormUtilitiesOptions, public formErrorService: FormErrorService) {
    super(options);
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
