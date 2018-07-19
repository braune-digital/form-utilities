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
    useExisting: forwardRef(() => DaterangeComponent),
    multi: true
  }],
  selector: 'bd-daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.scss']
})
export class DaterangeComponent extends FormInputComponent implements ControlValueAccessor, OnInit {

  @ViewChild(DefaultValueAccessor)
  input: DefaultValueAccessor;

  @Input()
  label: string;

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

  @ViewChild('dp')
  daterange: BsDaterangepickerDirective;

  constructor(@Inject('options') private options: FormUtilitiesOptions, public formErrorService: FormErrorService, public langService: BsLocaleService) {
    super(options);
  }

  ngOnInit() {
    super.ngOnInit();
    this.langService.use(this.bsLang);
  }
}
