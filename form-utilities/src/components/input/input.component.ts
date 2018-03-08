import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
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
export class InputComponent extends FormInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild(DefaultValueAccessor)
  input: DefaultValueAccessor;

  constructor(public formErrorService: FormErrorService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
