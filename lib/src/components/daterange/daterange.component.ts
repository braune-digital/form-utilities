import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {Component, EventEmitter, forwardRef, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';
import {BsDaterangepickerConfig, BsDaterangepickerDirective, BsLocaleService} from "ngx-bootstrap/datepicker";

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DaterangeComponent),
    multi: true
  }],
  selector: 'bd-daterange',
  templateUrl: './daterange.component.html'
})
export class DaterangeComponent extends FormInputComponent implements ControlValueAccessor, OnInit {

  @ViewChild(DefaultValueAccessor, {static: true})
  input: DefaultValueAccessor;

  @Input()
  label: string;

  @Input()
  help: string;

  @Input()
  inputClass: string;

  @Input()
  triggers = 'click';

  @Input()
  placeholder = '';

  @Input()
  disableErrors = false;

  @Input()
  formControl: FormControl = new FormControl('');

  @Input()
  bsConfig: BsDaterangepickerConfig = new BsDaterangepickerConfig();

  @Input()
  bsLang: string;

  @Input()
  bsMaxDate: Date = null;

  @Input()
  bsMinDate: Date = null;

  @Input()
  readOnly = false;

  @ViewChild('dp', {static: false})
  daterange: BsDaterangepickerDirective;

  @Output()
  datesPicked: EventEmitter<Date> = new EventEmitter();

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

  handleOutputDates(event: any){
    if(event){
      this.datesPicked.emit(event);
    }
  }
}
