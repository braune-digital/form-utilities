import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';
import {BsDatepickerConfig, BsDaterangepickerDirective, BsLocaleService} from "ngx-bootstrap/datepicker";

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
  }],
  selector: 'bd-datepicker',
  templateUrl: './datepicker.component.html'
})
export class DatepickerComponent extends FormInputComponent implements ControlValueAccessor, OnInit {

  @ViewChild(DefaultValueAccessor, {static: true})
  input: DefaultValueAccessor;

  @Input()
  label: string;

  @Input()
  inputClass: string;

  @Input()
  triggers = 'click';

  @Input()
  placeholder = '';

  @Input()
  disableErrors = false;

  @Input()
  bsValue: Date;

  @Input()
  formControl: FormControl = new FormControl('');

  @Input()
  bsConfig: BsDatepickerConfig = new BsDatepickerConfig();

  @Input()
  bsLang: string;

  @Input()
  bsMaxDate: Date = null;

  @Input()
  bsMinDate: Date = null;

  @Input()
  readOnly = false;

  @ViewChild('dp', {static: false})
  datepicker: BsDaterangepickerDirective;

  constructor(@Inject('FormUtilitiesOptions') protected _options: FormUtilitiesOptions,
              public formErrorService: FormErrorService,
              public langService: BsLocaleService
  ) {
    super(_options);
  }

  ngOnInit() {
    super.ngOnInit();
    this.bsLang ? this.langService.use(this.bsLang) : this.langService.use('en');
  }
}
