import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {Component, EventEmitter, forwardRef, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';
import { BsDaterangepickerConfig, BsDaterangepickerDirective, BsLocaleService} from 'ngx-bootstrap';

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
  bsConfig: BsDaterangepickerConfig = new BsDaterangepickerConfig();

  @Input()
  lang: string;

  @Input()
  bsMaxDate: Date = null;

  @Input()
  bsMinDate: Date = null;

  @ViewChild('dp')
  daterange: BsDaterangepickerDirective;

  @Output()
  datesPicked: EventEmitter<Date> = new EventEmitter();

  constructor(@Inject('options') protected _options: FormUtilitiesOptions, public formErrorService: FormErrorService, public langService: BsLocaleService) {
    super(_options);
  }

  ngOnInit() {
    super.ngOnInit();
    this.lang ? this.langService.use(this.lang) : this.langService.use('en');
  }

  handleOutputDates(event: any){
    this.datesPicked.emit(event);
  }
}
