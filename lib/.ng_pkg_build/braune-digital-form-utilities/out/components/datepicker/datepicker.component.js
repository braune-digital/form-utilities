/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FormInputComponent } from '../form-input.component';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Inject, Input, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { BsDatepickerConfig, BsDaterangepickerDirective, BsLocaleService } from 'ngx-bootstrap';
export class DatepickerComponent extends FormInputComponent {
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
DatepickerComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => DatepickerComponent),
                        multi: true
                    }],
                selector: 'bd-datepicker',
                template: `<div class="{{ options.classFormGroup }}" [ngClass]="{'has-errors': errors.length}">

  <div class="{{ options.classFromInput }}">

    <div class="{{ options.classFromLegend }}">

      <bd-form-label [label]="label" [inputId]="uniqueId"></bd-form-label>
      <bd-form-required [required]="requiredMarker" *ngIf="requiredMarker"></bd-form-required>
      <bd-form-tips [tips]="tips" *ngIf="tips"></bd-form-tips>

    </div>

    <div class="{{ inputGroupClass }}">

      <bd-form-addon [text]="prepend" position="prepend" *ngIf="prepend"></bd-form-addon>

      <input #dp
             type="text"
             class="{{ options.classFormControl }} {{ inputClass }}"
             bsDatepicker
             [bsConfig]="bsConfig"
             [formControl]="formControl"
             [placeholder]="placeholder"
             [attr.id]="uniqueId"
             [attr.maxlength]="maxLength"
             [attr.aria-label]="placeholder"
             [minDate]="bsMinDate"
             [maxDate]="bsMaxDate"
             [bsValue]="bsValue">

      <bd-form-addon [text]="append" position="append" *ngIf="append"></bd-form-addon>

    </div>
  </div>

  <bd-form-errors [errors]="errors" *ngIf="errors"></bd-form-errors>
  <bd-form-help [label]="help" *ngIf="help"></bd-form-help>
</div>
`
            },] },
];
/** @nocollapse */
DatepickerComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
    { type: BsLocaleService, },
];
DatepickerComponent.propDecorators = {
    "input": [{ type: ViewChild, args: [DefaultValueAccessor,] },],
    "label": [{ type: Input },],
    "inputClass": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "disableErrors": [{ type: Input },],
    "bsValue": [{ type: Input },],
    "formControl": [{ type: Input },],
    "bsConfig": [{ type: Input },],
    "bsLang": [{ type: Input },],
    "bsMaxDate": [{ type: Input },],
    "bsMinDate": [{ type: Input },],
    "datepicker": [{ type: ViewChild, args: ['dp',] },],
};
function DatepickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DatepickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DatepickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DatepickerComponent.propDecorators;
    /** @type {?} */
    DatepickerComponent.prototype.input;
    /** @type {?} */
    DatepickerComponent.prototype.label;
    /** @type {?} */
    DatepickerComponent.prototype.inputClass;
    /** @type {?} */
    DatepickerComponent.prototype.placeholder;
    /** @type {?} */
    DatepickerComponent.prototype.disableErrors;
    /** @type {?} */
    DatepickerComponent.prototype.bsValue;
    /** @type {?} */
    DatepickerComponent.prototype.formControl;
    /** @type {?} */
    DatepickerComponent.prototype.bsConfig;
    /** @type {?} */
    DatepickerComponent.prototype.bsLang;
    /** @type {?} */
    DatepickerComponent.prototype.bsMaxDate;
    /** @type {?} */
    DatepickerComponent.prototype.bsMinDate;
    /** @type {?} */
    DatepickerComponent.prototype.datepicker;
    /** @type {?} */
    DatepickerComponent.prototype._options;
    /** @type {?} */
    DatepickerComponent.prototype.formErrorService;
    /** @type {?} */
    DatepickerComponent.prototype.langService;
}
//# sourceMappingURL=datepicker.component.js.map