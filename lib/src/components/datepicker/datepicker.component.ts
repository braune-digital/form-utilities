import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';
import { BsDatepickerConfig, BsDaterangepickerDirective, BsLocaleService } from 'ngx-bootstrap';

@Component({
  moduleId: module.id,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
  }],
  selector: 'bd-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent extends FormInputComponent implements ControlValueAccessor, OnInit {

  @ViewChild(DefaultValueAccessor)
  input: DefaultValueAccessor;

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
  bsValue: Date;

  @Input()
  formControl: FormControl;

  @Input()
  bsConfig: BsDatepickerConfig = new BsDatepickerConfig();

  @Input()
  bsLang: string = 'en';

  @Input()
  bsMaxDate: Date = null;

  @Input()
  bsMinDate: Date = null;

  @ViewChild('dp')
  datepicker: BsDaterangepickerDirective;

  constructor(@Inject('options') public options: FormUtilitiesOptions, public formErrorService: FormErrorService, public langService: BsLocaleService) {
    super(options);
  }

  ngOnInit() {
    super.ngOnInit();
    this.langService.use(this.bsLang);
  }
}
