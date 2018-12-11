/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FormInputComponent } from '../form-input.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Inject, Input, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { BsDatepickerConfig, BsLocaleService, DatePickerComponent } from 'ngx-bootstrap';
export class DatetimepickerComponent extends FormInputComponent {
    /**
     * @param {?} _options
     * @param {?} formErrorService
     * @param {?} langService
     */
    constructor(_options, formErrorService, langService) {
        super(_options);
        this._options = _options;
        this.formErrorService = formErrorService;
        this.langService = langService;
        this.placeholder = '';
        this.disableErrors = false;
        this.bsConfig = new BsDatepickerConfig();
        this.bsLang = 'en';
        this.bsMaxDate = null;
        this.bsMinDate = null;
        this.isMeridian = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (!value) {
            this.dateTime = { date: null, time: new Date() };
        }
        else {
            this.dateTime = { date: new Date(value), time: new Date(value) };
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    onDateChange(date) {
        this.onChange(this.dateTime.date.toISOString());
    }
    /**
     * @param {?} date
     * @return {?}
     */
    onTimeChange(date) {
        if (this.dateTime.date) {
            this.dateTime.date.setHours(this.dateTime.time.getHours());
            this.dateTime.date.setMinutes(this.dateTime.time.getMinutes());
            this.dateTime.date.setSeconds(this.dateTime.time.getSeconds());
            this.onChange(this.dateTime.date.toISOString());
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.langService.use(this.bsLang);
        if (this.disabled) {
            this.formControl.disable();
        }
    }
}
DatetimepickerComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => DatetimepickerComponent),
                        multi: true
                    }],
                selector: 'bd-datetimepicker',
                template: `<div class="{{ options.classFormGroup }}" [ngClass]="{'has-errors': errors.length}">
  <bd-form-label [label]="label"></bd-form-label>

  <div class="row">
    <div class="col-md-6 col-sm-12">
      <input #dp
             type="text"
             class="{{ options.classFormControl }} {{ inputClass }}"
             bsDatepicker
             [bsConfig]="bsConfig"
             [placeholder]="placeholder"
             [disabled]="disabled"
             [minDate]="bsMinDate"
             [maxDate]="bsMaxDate"
             [bsValue]="dateTime.date"
             [(ngModel)]="dateTime.date"
             [disabled]="isDisabled"
             (ngModelChange)="onDateChange($event)"
      />
    </div>
    <div class="col-md-6 col-sm-12">
      <timepicker
              [(ngModel)]="dateTime.time"
              (ngModelChange)="onTimeChange($event)"
              [showMeridian]="isMeridian"
              [disabled]="disabled"
              [readonlyInput]="isDisabled"
      ></timepicker>
    </div>
  </div>

  <bd-form-errors [errors]="errors"></bd-form-errors>
  <bd-form-help [label]="help"></bd-form-help>

</div>
`,
                styles: [`:host timepicker{margin-top:-18px;display:block}:host ::ng-deep timepicker .btn{min-width:0;padding:0}`]
            },] },
];
/** @nocollapse */
DatetimepickerComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
    { type: BsLocaleService, },
];
DatetimepickerComponent.propDecorators = {
    "dp": [{ type: ViewChild, args: [DatePickerComponent,] },],
    "label": [{ type: Input },],
    "help": [{ type: Input },],
    "inputClass": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "disableErrors": [{ type: Input },],
    "formControl": [{ type: Input },],
    "bsConfig": [{ type: Input },],
    "bsLang": [{ type: Input },],
    "bsMaxDate": [{ type: Input },],
    "bsMinDate": [{ type: Input },],
    "isMeridian": [{ type: Input },],
};
function DatetimepickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DatetimepickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DatetimepickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DatetimepickerComponent.propDecorators;
    /** @type {?} */
    DatetimepickerComponent.prototype.input;
    /** @type {?} */
    DatetimepickerComponent.prototype.dateTime;
    /** @type {?} */
    DatetimepickerComponent.prototype.isDisabled;
    /** @type {?} */
    DatetimepickerComponent.prototype.dp;
    /** @type {?} */
    DatetimepickerComponent.prototype.label;
    /** @type {?} */
    DatetimepickerComponent.prototype.help;
    /** @type {?} */
    DatetimepickerComponent.prototype.inputClass;
    /** @type {?} */
    DatetimepickerComponent.prototype.placeholder;
    /** @type {?} */
    DatetimepickerComponent.prototype.disableErrors;
    /** @type {?} */
    DatetimepickerComponent.prototype.formControl;
    /** @type {?} */
    DatetimepickerComponent.prototype.bsConfig;
    /** @type {?} */
    DatetimepickerComponent.prototype.bsLang;
    /** @type {?} */
    DatetimepickerComponent.prototype.bsMaxDate;
    /** @type {?} */
    DatetimepickerComponent.prototype.bsMinDate;
    /** @type {?} */
    DatetimepickerComponent.prototype.isMeridian;
    /** @type {?} */
    DatetimepickerComponent.prototype.onChange;
    /** @type {?} */
    DatetimepickerComponent.prototype.onTouched;
    /** @type {?} */
    DatetimepickerComponent.prototype._options;
    /** @type {?} */
    DatetimepickerComponent.prototype.formErrorService;
    /** @type {?} */
    DatetimepickerComponent.prototype.langService;
}
//# sourceMappingURL=datetimepicker.component.js.map