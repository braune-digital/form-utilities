import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';
import {BsDatepickerConfig, BsDaterangepickerDirective, BsLocaleService, DatePickerComponent} from 'ngx-bootstrap';
import {Time} from 'ngx-bootstrap/timepicker/timepicker.models';

@Component({
  moduleId: module.id,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatetimepickerComponent),
    multi: true
  }],
  selector: 'bd-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss']
})
export class DatetimepickerComponent extends FormInputComponent implements ControlValueAccessor, OnInit {

  input;

  dateTime: {date: Date, time: Date};
  isDisabled: boolean;

  @ViewChild(DatePickerComponent)
  dp: DatePickerComponent;

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
  bsConfig: BsDatepickerConfig = new BsDatepickerConfig();

  @Input()
  bsLang: string = 'en';

  @Input()
  bsMaxDate: Date = null;

  @Input()
  bsMinDate: Date = null;

  @Input()
  isMeridian = false;

  onChange: (_: any) => void;
  onTouched: () => void;

  constructor(@Inject('options') protected _options: FormUtilitiesOptions, public formErrorService: FormErrorService, public langService: BsLocaleService) {
    super(_options);
  }

  writeValue(value: string): void {
    if (!value) {
      this.dateTime = {date: null, time: new Date()};
    } else {
      this.dateTime = {date: new Date(value), time: new Date(value)};
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onDateChange(date: any) {
    this.onChange(this.dateTime.date.toISOString());
  }

  onTimeChange(date: any) {
    if (this.dateTime.date) {
      this.dateTime.date.setHours(this.dateTime.time.getHours());
      this.dateTime.date.setMinutes(this.dateTime.time.getMinutes());
      this.dateTime.date.setSeconds(this.dateTime.time.getSeconds());
      this.onChange(this.dateTime.date.toISOString());
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.langService.use(this.bsLang);
  }
}
