import { Inject, Input, Injectable, Component, EventEmitter, forwardRef, Output, ViewChild, Directive, ElementRef, Renderer2, HostListener, HostBinding, NgModule } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR, CheckboxControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService, DatePickerComponent, PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { CKEditorComponent, CKEditorModule } from 'ng2-ckeditor';
import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { noop } from 'rxjs/util/noop';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { QuillModule } from 'ngx-quill';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
class FormInputComponent {
    /**
     * @param {?} _options
     */
    constructor(_options) {
        this._options = _options;
        this.displayErrors = false;
        this.requiredMarker = false;
        this.disabled = false;
        this.uniqueId = '_' + Math.random().toString(36).substr(2, 9);
    }
    /**
     * @return {?}
     */
    get errors() {
        if ((this.options.displayErrors || this.displayErrors)
            && this.formControl
            && this.formControl.touched
            && this.formControl.errors) {
            return Object.keys(this.formControl.errors).map(key => {
                // If error is a remote error take the message directly
                if (key.substr(0, FormInputComponent.REMOTE_ERROR_PREFIX.length) == FormInputComponent.REMOTE_ERROR_PREFIX) {
                    return this.formControl.errors[key];
                }
                return FormInputComponent.ERROR_PREFIX + '.' + key;
            });
        }
        return [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Tell the
        this.formErrorServiceSubscription = this.formErrorService.propertyError.subscribe(error => {
            // todo - @Jannik - do not set this on every control
            // todo - Maybe use a custom formBuilder and register the parent form on the formErrorService
            // todo - For performance use onPush-strategy if above solution is not yet implemented
            if (this.formControl && this.formControl.root) {
                const /** @type {?} */ control = this.formControl.root.get(error.property_path);
                const /** @type {?} */ errorKey = this.getErrorKey(error.property_path);
                if (control && !control.hasError(errorKey)) {
                    control.setErrors(Object.assign({}, control.errors, { [errorKey]: error.message }));
                }
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.formErrorServiceSubscription.unsubscribe();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.input.writeValue(value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.input.registerOnChange(fn);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.input.registerOnTouched(fn);
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.input.setDisabledState(isDisabled);
    }
    /**
     * @return {?}
     */
    get inputGroupClass() {
        if (this.prepend) {
            return this._options.classFormInputGroup + ' ' + this._options.classFormInputGroup + '--prepend';
        }
        if (this.append) {
            return this._options.classFormInputGroup + ' ' + this._options.classFormInputGroup + '--append';
        }
        return '';
    }
    /**
     * @param {?} propertyPath
     * @return {?}
     */
    getErrorKey(propertyPath) {
        return FormInputComponent.REMOTE_ERROR_PREFIX + propertyPath.split('.').pop();
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
    /**
     * @return {?}
     */
    get focus() {
        return this._focus;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set focus(value) {
        this._focus = value;
    }
}
FormInputComponent.REMOTE_ERROR_PREFIX = 'remote_';
FormInputComponent.ERROR_PREFIX = 'form.errors';
/** @nocollapse */
FormInputComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
];
FormInputComponent.propDecorators = {
    "displayErrors": [{ type: Input },],
    "requiredMarker": [{ type: Input },],
    "tips": [{ type: Input },],
    "help": [{ type: Input },],
    "maxLength": [{ type: Input },],
    "append": [{ type: Input },],
    "prepend": [{ type: Input },],
    "disabled": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormErrorService {
    constructor() {
        this.propertyError = new Subject();
        this.formError = new Subject();
    }
}
FormErrorService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class InputComponent extends FormInputComponent {
    /**
     * @param {?} _options
     * @param {?} formErrorService
     */
    constructor(_options, formErrorService) {
        super(_options);
        this._options = _options;
        this.formErrorService = formErrorService;
        this.placeholder = '';
        this.type = 'text';
        this.step = '';
        this.disableErrors = false;
        this.onInputKeypress = new EventEmitter();
        this.onInputChange = new EventEmitter();
        this.onInputKeyup = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onFocusOut = new EventEmitter();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    handleOnInputKeypress(value) {
        this.onInputKeypress.emit(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    handleOnInputChange(value) {
        this.onInputChange.emit(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    handleOnInputKeyup(value) {
        this.onInputKeyup.emit(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    handleOnFocus(value) {
        this.focus = true;
        this.onFocus.emit(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    handleOnFocusOut(value) {
        this.focus = false;
        this.onFocusOut.emit(value);
    }
}
InputComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => InputComponent),
                        multi: true
                    }],
                selector: 'bd-input',
                template: `<div class="{{ options.classFormGroup }}" [ngClass]="{'focus': focus, 'has-errors': errors.length}">

  <div class="{{ options.classFromInput }}">

    <div class="{{ options.classFromLegend }}">

      <bd-form-label [label]="label" [inputId]="uniqueId"></bd-form-label>
      <bd-form-required [required]="requiredMarker" *ngIf="requiredMarker"></bd-form-required>
      <bd-form-tips [tips]="tips" *ngIf="tips"></bd-form-tips>
      <bd-form-counter [maxLength]="maxLength" [form]="formControl" *ngIf="maxLength && options.counterBefore"></bd-form-counter>

    </div>

    <div class="{{ inputGroupClass }}">

      <bd-form-addon [text]="prepend" position="prepend" *ngIf="prepend"></bd-form-addon>

      <input [disabled]="disabled"
             [type]="type"
             [step]="step"
             class="{{ options.classFormControl }} {{ inputClass }}"
             [placeholder]="placeholder"
             [attr.id]="uniqueId"
             [attr.maxlength]="maxLength"
             [attr.aria-label]="placeholder"
             (focusout)="handleOnFocusOut($event.target.value)"
             (focus)="handleOnFocus($event.target.value)"
             (change)="handleOnInputChange($event.target.value)"
             (keypress)="handleOnInputKeypress($event.target.value)"
             (keyup)="handleOnInputKeyup($event.target.value)"
             ngDefaultControl>

      <bd-form-addon [text]="append" position="append" *ngIf="append"></bd-form-addon>

    </div>
  </div>

  <bd-form-errors [errors]="errors"></bd-form-errors>
  <bd-form-counter [maxLength]="maxLength" [form]="formControl" *ngIf="maxLength && !options.counterBefore"></bd-form-counter>
  <bd-form-help [label]="help" *ngIf="help"></bd-form-help>
</div>
`
            },] },
];
/** @nocollapse */
InputComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
];
InputComponent.propDecorators = {
    "input": [{ type: ViewChild, args: [DefaultValueAccessor,] },],
    "label": [{ type: Input },],
    "inputClass": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "type": [{ type: Input },],
    "step": [{ type: Input },],
    "disableErrors": [{ type: Input },],
    "formControl": [{ type: Input },],
    "onInputKeypress": [{ type: Output },],
    "onInputChange": [{ type: Output },],
    "onInputKeyup": [{ type: Output },],
    "onFocus": [{ type: Output },],
    "onFocusOut": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatepickerComponent extends FormInputComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DaterangeComponent extends FormInputComponent {
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
    }
}
DaterangeComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => DaterangeComponent),
                        multi: true
                    }],
                selector: 'bd-daterange',
                template: `<div class="{{ options.classFormGroup }}" [ngClass]="{'has-errors': errors.length}">
  <bd-form-label [label]="label"></bd-form-label>

  <input #dp
         type="text"
         class="{{ options.classFormControl }} {{ inputClass }}"
         bsDaterangepicker
         [bsConfig]="bsConfig"
         [formControl]="formControl"
         [placeholder]="placeholder"
         [minDate]="bsMinDate"
         [maxDate]="bsMaxDate"
  >

  <bd-form-errors [errors]="errors"></bd-form-errors>
  <bd-form-help [label]="help"></bd-form-help>

</div>

<div class="{{ options.classFormGroup }}">

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
             bsDaterangepicker
             [bsConfig]="bsConfig"
             [formControl]="formControl"
             [placeholder]="placeholder"
             [attr.id]="uniqueId"
             [attr.maxlength]="maxLength"
             [attr.aria-label]="placeholder"
             [minDate]="bsMinDate"
             [maxDate]="bsMaxDate"
      >

      <bd-form-addon [text]="append" position="append" *ngIf="append"></bd-form-addon>
    </div>
  </div>

  <bd-form-errors [errors]="errors" *ngIf="errors"></bd-form-errors>
  <bd-form-help [label]="help" *ngIf="help"></bd-form-help>
</div>
`,
                styles: [`::ng-deep .bs-datepicker{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;background:#fff;-webkit-box-shadow:0 0 10px 0 #aaa;box-shadow:0 0 10px 0 #aaa;position:relative;z-index:1}::ng-deep .bs-datepicker:after{clear:both;content:'';display:block}::ng-deep .bs-datepicker bs-day-picker{float:left}::ng-deep .bs-datepicker button:active,::ng-deep .bs-datepicker button:focus,::ng-deep .bs-datepicker button:hover,::ng-deep .bs-datepicker input:active,::ng-deep .bs-datepicker input:focus,::ng-deep .bs-datepicker input:hover,::ng-deep .bs-datepicker-btns button:active,::ng-deep .bs-datepicker-btns button:focus,::ng-deep .bs-datepicker-btns button:hover,::ng-deep .bs-datepicker-predefined-btns button:active,::ng-deep .bs-datepicker-predefined-btns button:focus{outline:0}::ng-deep .bs-datepicker-head{min-width:270px;height:50px;padding:10px;border-radius:3px 3px 0 0;text-align:justify}::ng-deep .bs-datepicker-head:after{content:"";display:inline-block;vertical-align:top;width:100%}::ng-deep .bs-datepicker-head button{display:inline-block;vertical-align:top;padding:0;height:30px;line-height:30px;border:0;background:0 0;text-align:center;cursor:pointer;color:#fff;-webkit-transition:.3s;transition:.3s}::ng-deep .bs-datepicker-head button[disabled],::ng-deep .bs-datepicker-head button[disabled]:active,::ng-deep .bs-datepicker-head button[disabled]:hover{background:rgba(221,221,221,.3);color:#f5f5f5;cursor:not-allowed}::ng-deep .bs-datepicker-head button.next,::ng-deep .bs-datepicker-head button.previous{border-radius:50%;width:30px;height:30px}::ng-deep .bs-datepicker-head button.next span,::ng-deep .bs-datepicker-head button.previous span{font-size:28px;line-height:1;display:inline-block;position:relative;height:100%;width:100%;border-radius:50%}::ng-deep .bs-datepicker-head button.current{border-radius:15px;max-width:155px;padding:0 13px}::ng-deep .bs-datepicker-head button:hover{background-color:rgba(0,0,0,.1)}::ng-deep .bs-datepicker-head button:active{background-color:rgba(0,0,0,.2)}::ng-deep .bs-datepicker-body{padding:10px;border-radius:0 0 3px 3px;min-height:232px;min-width:278px;border:1px solid #e9edf0}::ng-deep .bs-datepicker-body .days.weeks{position:relative;z-index:1}::ng-deep .bs-datepicker-body table{width:100%;border-collapse:separate;border-spacing:0}::ng-deep .bs-datepicker-body table th{font-size:13px;color:#9aaec1;font-weight:400;text-align:center}::ng-deep .bs-datepicker-body table td{color:#54708b;text-align:center;position:relative;padding:0}::ng-deep .bs-datepicker-body table td span{display:block;margin:0 auto;font-size:13px;border-radius:50%;position:relative;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}::ng-deep .bs-datepicker-body table td:not(.disabled) span{cursor:pointer}::ng-deep .bs-datepicker-body table td span.is-highlighted:not(.disabled):not(.selected),::ng-deep .bs-datepicker-body table td.is-highlighted:not(.disabled):not(.selected) span{background-color:#e9edf0;-webkit-transition:0s;transition:0s}::ng-deep .bs-datepicker-body table td span.disabled,::ng-deep .bs-datepicker-body table td.disabled span{color:#9aaec1}::ng-deep .bs-datepicker-body table td span.selected,::ng-deep .bs-datepicker-body table td.selected span{color:#fff}::ng-deep .bs-datepicker-body table td.active{position:relative}::ng-deep .bs-datepicker-body table td.active.select-start:before{left:35%}::ng-deep .bs-datepicker-body table td.active.select-end:before{left:-85%}::ng-deep .bs-datepicker-body table td span.active.select-end:after,::ng-deep .bs-datepicker-body table td span.active.select-start:after,::ng-deep .bs-datepicker-body table td.active.select-end span:after,::ng-deep .bs-datepicker-body table td.active.select-start span:after{content:"";display:block;position:absolute;z-index:-1;width:100%;height:100%;-webkit-transition:.3s;transition:.3s;top:0;border-radius:50%}::ng-deep .bs-datepicker-body table td span:before,::ng-deep .bs-datepicker-body table td:before{content:"";display:block;position:absolute;z-index:-1;top:6px;bottom:6px;left:-2px;right:-2px;-webkit-box-sizing:content-box;box-sizing:content-box;background:0 0}::ng-deep .bs-datepicker-body table td.active.select-start+td.active:before{left:-20%}::ng-deep .bs-datepicker-body table td:last-child.active:before{border-radius:0 3px 3px 0;width:125%;left:-25%}::ng-deep .bs-datepicker-body table td span[class*=select-],::ng-deep .bs-datepicker-body table td[class*=select-] span{border-radius:50%;color:#fff}::ng-deep .bs-datepicker-body table.days span.active:not(.select-start):before,::ng-deep .bs-datepicker-body table.days span.in-range:not(.select-start):before,::ng-deep .bs-datepicker-body table.days td.active:not(.select-start):before,::ng-deep .bs-datepicker-body table.days td.in-range:not(.select-start):before{background:#e9edf0}::ng-deep .bs-datepicker-body table.days span{width:32px;height:32px;line-height:32px}::ng-deep .bs-datepicker-body table.days span.select-start{z-index:2}::ng-deep .bs-datepicker-body table.days span.in-range.select-end:before,::ng-deep .bs-datepicker-body table.days span.is-highlighted.in-range:before{background:0 0;right:0;left:0}::ng-deep .bs-datepicker-body table.days td.active+td.is-highlighted:before,::ng-deep .bs-datepicker-body table.days td.active+td.select-end:before,::ng-deep .bs-datepicker-body table.days td.in-range+td.is-highlighted:before,::ng-deep .bs-datepicker-body table.days td.in-range+td.select-end:before,::ng-deep .bs-datepicker-body table.days td.select-start+td.is-highlighted:before,::ng-deep .bs-datepicker-body table.days td.select-start+td.select-end:before{background:#e9edf0;width:100%}::ng-deep .bs-datepicker-body table.weeks tr td:nth-child(2).active:before{border-radius:3px 0 0 3px;left:0;width:100%}::ng-deep .bs-datepicker-body table:not(.weeks) tr td:first-child:before{border-radius:3px 0 0 3px}::ng-deep .bs-datepicker-body table.years td span{width:46px;height:46px;line-height:45px;margin:0 auto}::ng-deep .bs-datepicker-body table.years tr:not(:last-child) td span{margin-bottom:8px}::ng-deep .bs-datepicker-body table.months td{height:52px}::ng-deep .bs-datepicker-body table.months td span{padding:6px;border-radius:15px}::ng-deep .bs-datepicker .current-timedate{color:#54708b;font-size:15px;text-align:center;height:30px;line-height:30px;border-radius:20px;border:1px solid #e9edf0;margin-bottom:10px;cursor:pointer;text-transform:uppercase;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}::ng-deep .bs-datepicker .current-timedate span:not(:empty):before{content:"";width:15px;height:16px;display:inline-block;margin-right:4px;vertical-align:text-bottom;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAABMklEQVQoU9VTwW3CQBCcOUgBtEBKSAukAnBKME+wFCAlYIhk8sQlxFABtJAScAsuAPBEewYcxCP8ouxrPDsza61uiVN1o6RNHD4htSCmq49RfO71BvMJqBBkITRf1kmUW49nQRC9h1I5AZlBClaL8aP1fKgOOxCx8aSLs+Q19eZuNO8QmPqJRtDFguy7OAcDbJPs+/BKVPDIPrvD2ZJgWAmVe7O0rI0Vqs1seyWUXpuJoppYCa5L+U++NpNPkr5OE2oMdARsb3gykJT5ydZcL8Z9Ww60nxg2LhjON9li9OwXZzo+xLbp3nC2s9CL2RrueGyVrgwNm8HpsCzZ9EEW6kqXlo1GQe03FzP/7W8Hl0dBtu7Bf7zt6mIwvX1RvzDCm7+q3mAW0Dl/GPdUCeXrZLT9BrDrGkm4qlPvAAAAAElFTkSuQmCC)}::ng-deep .bs-datepicker-multiple{display:inline-block;border-radius:4px 0 0 4px}::ng-deep .bs-datepicker-multiple+::ng-deep .bs-datepicker-multiple{margin-left:10px}::ng-deep .bs-datepicker-multiple .bs-datepicker{-webkit-box-shadow:none;box-shadow:none;position:relative}::ng-deep .bs-datepicker-multiple .bs-datepicker:not(:last-child){padding-right:10px}::ng-deep .bs-datepicker-multiple .bs-datepicker+.bs-datepicker:after{content:"";display:block;width:14px;height:10px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAKCAYAAABrGwT5AAAA1ElEQVQoU42RsQrCUAxF77VuDu7O4oMWW//BURBBpZvgKk4uIrjoqKOTf+DopIO4uYggtFTfw3+pkQqCW1/G5J7kJiFy4m5MxUlxAzgIPHX+lzMPzupRYlYgxiR7vqsOP8YKzsTx0yxFMCUZ+q7aZzlr+OvgoWcAFyAHgat2jLWu48252DdqAihDJGSSJNUUxYmQjs3+hPQBlAh2rG2LCOPnaw3IiGDX99TRCs7ASJsNhUOA7d/LcuHvRG22FIZvsNXw1MX6VZExCilOQKEfeLXr/10+aC9Ho7arh7oAAAAASUVORK5CYII=);position:absolute;top:25px;left:-8px}::ng-deep .bs-datepicker-multiple .bs-datepicker .left{float:left}::ng-deep .bs-datepicker-multiple .bs-datepicker .right{float:right}::ng-deep .bs-datepicker-container{padding:15px}::ng-deep .bs-datepicker-custom-range{padding:15px;background:#eee}::ng-deep .bs-datepicker-predefined-btns button{width:100%;display:block;height:30px;background-color:#9aaec1;border-radius:4px;color:#fff;border:0;margin-bottom:10px;padding:0 18px;text-align:left;-webkit-transition:.3s;transition:.3s}::ng-deep .bs-datepicker-predefined-btns button:active,::ng-deep .bs-datepicker-predefined-btns button:hover{background-color:#54708b}::ng-deep .bs-datepicker .is-other-month{color:rgba(0,0,0,.25)}::ng-deep .bs-datepicker-buttons{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;padding-top:10px;border-top:1px solid #e9edf0}::ng-deep .bs-datepicker-buttons .btn-default{margin-left:10px}::ng-deep .bs-timepicker-container{padding:10px 0}::ng-deep .bs-timepicker-label{color:#54708b;margin-bottom:10px}::ng-deep .bs-timepicker-controls{display:inline-block;vertical-align:top;margin-right:10px}::ng-deep .bs-timepicker-controls button{width:20px;height:20px;border-radius:50%;border:0;background-color:#e9edf0;color:#54708b;font-size:16px;font-weight:700;vertical-align:middle;line-height:0;padding:0;-webkit-transition:.3s;transition:.3s}::ng-deep .bs-timepicker-controls button:hover{background-color:#d5dadd}::ng-deep .bs-timepicker-controls input{width:35px;height:25px;border-radius:13px;text-align:center;border:1px solid #e9edf0}::ng-deep .bs-timepicker .switch-time-format{text-transform:uppercase;min-width:54px;height:25px;border-radius:20px;border:1px solid #e9edf0;background:#fff;color:#54708b;font-size:13px}::ng-deep .bs-timepicker .switch-time-format img{vertical-align:initial;margin-left:4px}::ng-deep bs-datepicker-container,::ng-deep bs-daterangepicker-container{z-index:1080}@media (max-width:768px){::ng-deep .bs-datepicker-multiple{display:-webkit-box;display:-ms-flexbox;display:flex}::ng-deep .bs-datepicker-multiple+::ng-deep .bs-datepicker-multiple{margin-top:10px;margin-left:0}}::ng-deep .theme-default .bs-datepicker-head{background-color:#777}::ng-deep .theme-default .bs-datepicker-body table td span.selected,::ng-deep .theme-default .bs-datepicker-body table td span[class*=select-]:after,::ng-deep .theme-default .bs-datepicker-body table td.selected span,::ng-deep .theme-default .bs-datepicker-body table td[class*=select-] span:after{background-color:#777}::ng-deep .theme-default .bs-datepicker-body table td.week span{color:#777}::ng-deep .theme-green .bs-datepicker-head{background-color:#5cb85c}::ng-deep .theme-green .bs-datepicker-body table td span.selected,::ng-deep .theme-green .bs-datepicker-body table td span[class*=select-]:after,::ng-deep .theme-green .bs-datepicker-body table td.selected span,::ng-deep .theme-green .bs-datepicker-body table td[class*=select-] span:after{background-color:#5cb85c}::ng-deep .theme-green .bs-datepicker-body table td.week span{color:#5cb85c}::ng-deep .theme-blue .bs-datepicker-head{background-color:#5bc0de}::ng-deep .theme-blue .bs-datepicker-body table td span.selected,::ng-deep .theme-blue .bs-datepicker-body table td span[class*=select-]:after,::ng-deep .theme-blue .bs-datepicker-body table td.selected span,::ng-deep .theme-blue .bs-datepicker-body table td[class*=select-] span:after{background-color:#5bc0de}::ng-deep .theme-blue .bs-datepicker-body table td.week span{color:#5bc0de}::ng-deep .theme-dark-blue .bs-datepicker-head{background-color:#337ab7}::ng-deep .theme-dark-blue .bs-datepicker-body table td span.selected,::ng-deep .theme-dark-blue .bs-datepicker-body table td span[class*=select-]:after,::ng-deep .theme-dark-blue .bs-datepicker-body table td.selected span,::ng-deep .theme-dark-blue .bs-datepicker-body table td[class*=select-] span:after{background-color:#337ab7}::ng-deep .theme-dark-blue .bs-datepicker-body table td.week span{color:#337ab7}::ng-deep .theme-red .bs-datepicker-head{background-color:#d9534f}::ng-deep .theme-red .bs-datepicker-body table td span.selected,::ng-deep .theme-red .bs-datepicker-body table td span[class*=select-]:after,::ng-deep .theme-red .bs-datepicker-body table td.selected span,::ng-deep .theme-red .bs-datepicker-body table td[class*=select-] span:after{background-color:#d9534f}::ng-deep .theme-red .bs-datepicker-body table td.week span{color:#d9534f}::ng-deep .theme-orange .bs-datepicker-head{background-color:#f0ad4e}::ng-deep .theme-orange .bs-datepicker-body table td span.selected,::ng-deep .theme-orange .bs-datepicker-body table td span[class*=select-]:after,::ng-deep .theme-orange .bs-datepicker-body table td.selected span,::ng-deep .theme-orange .bs-datepicker-body table td[class*=select-] span:after{background-color:#f0ad4e}::ng-deep .theme-orange .bs-datepicker-body table td.week span{color:#f0ad4e}`]
            },] },
];
/** @nocollapse */
DaterangeComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
    { type: BsLocaleService, },
];
DaterangeComponent.propDecorators = {
    "input": [{ type: ViewChild, args: [DefaultValueAccessor,] },],
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
    "daterange": [{ type: ViewChild, args: ['dp',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TextareaComponent extends FormInputComponent {
    /**
     * @param {?} _options
     * @param {?} formErrorService
     */
    constructor(_options, formErrorService) {
        super(_options);
        this._options = _options;
        this.formErrorService = formErrorService;
        this.placeholder = '';
        this.disableErrors = false;
    }
}
TextareaComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => TextareaComponent),
                        multi: true
                    }],
                selector: 'bd-textarea',
                template: `<div class="{{ options.classFormGroup }}" [ngClass]="{'has-errors': errors.length}">

  <div class="{{ options.classFromInput }}">

    <div class="{{ options.classFromLegend }}">

      <bd-form-label [label]="label" [inputId]="uniqueId"></bd-form-label>
      <bd-form-required [required]="requiredMarker" *ngIf="requiredMarker"></bd-form-required>
      <bd-form-tips [tips]="tips" *ngIf="tips"></bd-form-tips>
      <bd-form-counter [maxLength]="maxLength" [form]="formControl" *ngIf="maxLength && options.counterBefore"></bd-form-counter>

    </div>

    <div class="{{ inputGroupClass }}">

      <bd-form-addon [text]="prepend" position="prepend" *ngIf="prepend"></bd-form-addon>

      <textarea [disabled]="disabled"
                class="{{ options.classFormControl }} {{ inputClass }}"
                [placeholder]="placeholder"
                [attr.id]="uniqueId"
                [attr.maxlength]="maxLength"
                [attr.aria-label]="placeholder"
                autosize
                ngDefaultControl>
      </textarea>

      <bd-form-addon [text]="append" position="append" *ngIf="append"></bd-form-addon>

    </div>
  </div>

  <bd-form-errors [errors]="errors" *ngIf="errors"></bd-form-errors>
  <bd-form-counter [maxLength]="maxLength" [form]="formControl" *ngIf="maxLength && !options.counterBefore"></bd-form-counter>
  <bd-form-help [label]="help" *ngIf="help"></bd-form-help>
</div>
`
            },] },
];
/** @nocollapse */
TextareaComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
];
TextareaComponent.propDecorators = {
    "input": [{ type: ViewChild, args: [DefaultValueAccessor,] },],
    "label": [{ type: Input },],
    "help": [{ type: Input },],
    "inputClass": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "disableErrors": [{ type: Input },],
    "formControl": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CkeditorComponent extends FormInputComponent {
    /**
     * @param {?} _options
     * @param {?} formErrorService
     */
    constructor(_options, formErrorService) {
        super(_options);
        this._options = _options;
        this.formErrorService = formErrorService;
        this.ckeditorConfig = {
            'skin': 'moono-lisa',
            'toolbar': [
                {
                    name: 'bd-form', items: ['Format', '-', 'Source', '-', 'Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', '-', 'Link']
                }
            ]
        };
        this.placeholder = '';
        this.disableErrors = false;
    }
    /**
     * @param {?} _value
     * @return {?}
     */
    onEditorChange(_value) {
        this.onChange(_value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.editor.value = value;
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
        this.input.registerOnTouched(fn);
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.input.setDisabledState(isDisabled);
    }
}
CkeditorComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => CkeditorComponent),
                        multi: true
                    }],
                selector: 'bd-ckeditor',
                template: `<div class="{{ options.classFormGroup }}" [ngClass]="{'has-errors': errors.length}">

  <div class="{{ options.classFromInput }}">

    <div class="{{ options.classFromLegend }}">

      <bd-form-label [label]="label" [inputId]="uniqueId"></bd-form-label>
      <bd-form-required [required]="requiredMarker" *ngIf="requiredMarker"></bd-form-required>
      <bd-form-tips [tips]="tips" *ngIf="tips"></bd-form-tips>
      <bd-form-counter [maxLength]="maxLength" [form]="formControl" *ngIf="maxLength && options.counterBefore"></bd-form-counter>

    </div>

    <div class="{{ inputGroupClass }}">

      <ckeditor
        class="{{ inputClass }}"
        [attr.id]="uniqueId"
        [attr.maxlength]="maxLength"
        [attr.aria-label]="placeholder"
        [config]="ckeditorConfig"
        (change)="onEditorChange($event)"
        ngDefaultControl>
      </ckeditor>

    </div>
  </div>

  <bd-form-errors [errors]="errors" *ngIf="errors"></bd-form-errors>
  <bd-form-counter [maxLength]="maxLength" [form]="formControl" *ngIf="maxLength && !options.counterBefore"></bd-form-counter>
  <bd-form-help [label]="help" *ngIf="help"></bd-form-help>
</div>
`
            },] },
];
/** @nocollapse */
CkeditorComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
];
CkeditorComponent.propDecorators = {
    "input": [{ type: ViewChild, args: [DefaultValueAccessor,] },],
    "editor": [{ type: ViewChild, args: [CKEditorComponent,] },],
    "ckeditorConfig": [{ type: Input },],
    "inputClass": [{ type: Input },],
    "label": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "disableErrors": [{ type: Input },],
    "formControl": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ProgressButtonComponent {
    constructor() {
        this.btnClass = 'btn-primary';
        this.btnType = 'button';
        this.btnStateLoading = false;
        this.btnStateSuccess = false;
        this.btnDisabled = false;
    }
}
ProgressButtonComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-progress-button',
                template: `<button class="btn btn-progress {{ btnClass }}"
        [attr.type]="btnType"
        [disabled]="btnDisabled"
        [ngClass]="{'btn-loading': btnStateLoading, 'btn-onSuccess': btnStateSuccess}"
>
  <div class="btn-loading">
        <span class='loader'>
            <span></span>
            <span></span>
            <span></span>
        </span>
  </div>
  <div class="btn-text">
    <ng-content></ng-content>
  </div>
  <div class="btn-onSuccess">
    <i class="fa fa-check"></i>
  </div>
</button>
`,
                styles: [`:host .button-progress{padding:0;min-height:40px;min-width:190px;overflow:hidden;position:relative}:host .button-progress .btn-text{padding:11px 2.5px;text-align:center}:host .button-progress .btn-loading{position:relative}:host .button-progress .btn-loading .loader{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);display:inline-block;line-height:6px}:host .button-progress .btn-loading .loader span{display:inline-block;width:6px;height:6px;border-radius:50%;background:#fff;margin:0 3px;-webkit-animation:.6s infinite load;animation:.6s infinite load}:host .button-progress .btn-loading .loader span:nth-child(2){-webkit-animation-delay:.1s;animation-delay:.1s}:host .button-progress .btn-loading .loader span:nth-child(3){-webkit-animation-delay:.2s;animation-delay:.2s}:host .button-progress .btn-loading,:host .button-progress .btn-success,:host .button-progress .btn-text{display:block;-webkit-transition:opacity .1s ease-in-out,-webkit-transform .2s ease-in-out;transition:opacity .1s ease-in-out,-webkit-transform .2s ease-in-out;transition:transform .2s ease-in-out,opacity .1s ease-in-out;transition:transform .2s ease-in-out,opacity .1s ease-in-out,-webkit-transform .2s ease-in-out;position:absolute;top:0;left:0;right:0;bottom:0}:host .button-progress .btn-loading{-webkit-transform:translate(0,100%);transform:translate(0,100%);opacity:0}:host .button-progress .btn-onSuccess{-webkit-transform:translate(0,100%);transform:translate(0,100%);opacity:0}:host .button-progress.btn-loading{pointer-events:none}:host .button-progress.btn-loading .btn-text{-webkit-transform:translate(0,-100%);transform:translate(0,-100%);opacity:0}:host .button-progress.btn-loading .btn-onSuccess{-webkit-transform:translate(0,-100%);transform:translate(0,-100%);opacity:0}:host .button-progress.btn-loading .btn-loading{-webkit-transform:translate(0,0);transform:translate(0,0);opacity:1}:host .button-progress.btn-onSuccess{pointer-events:none}:host .button-progress.btn-onSuccess .btn-text{-webkit-transform:translate(0,-100%);transform:translate(0,-100%);opacity:0}:host .button-progress.btn-onSuccess .btn-loading{-webkit-transform:translate(0,-100%);transform:translate(0,-100%);opacity:0}:host .button-progress.btn-onSuccess .btn-onSuccess{-webkit-transform:translate(0,0);transform:translate(0,0);opacity:1}@-webkit-keyframes load{from,to{opacity:.6;-webkit-transform:scale(1);transform:scale(1)}30%,80%{opacity:.7;-webkit-transform:scale(1.1);transform:scale(1.1)}50%{opacity:1;-webkit-transform:scale(1.4);transform:scale(1.4)}}@keyframes load{from,to{opacity:.6;-webkit-transform:scale(1);transform:scale(1)}30%,80%{opacity:.7;-webkit-transform:scale(1.1);transform:scale(1.1)}50%{opacity:1;-webkit-transform:scale(1.4);transform:scale(1.4)}}`]
            },] },
];
/** @nocollapse */
ProgressButtonComponent.propDecorators = {
    "btnClass": [{ type: Input },],
    "btnType": [{ type: Input },],
    "btnStateLoading": [{ type: Input },],
    "btnStateSuccess": [{ type: Input },],
    "btnDisabled": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectDirective {
    /**
     * @param {?} _options
     * @param {?} renderer
     * @param {?} elementRef
     */
    constructor(_options, renderer, elementRef) {
        this._options = _options;
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Create a div with form-group
        const /** @type {?} */ formGroupDiv = this.renderer.createElement('div');
        this.renderer.addClass(formGroupDiv, this._options.classFormGroup);
        if (this.label) {
            const /** @type {?} */ label = this.renderer.createElement('label');
            const /** @type {?} */ labelText = this.renderer.createText(this.label);
            this.renderer.addClass(label, this._options.classFormLabel);
            this.renderer.appendChild(label, labelText);
            this.renderer.appendChild(formGroupDiv, label);
        }
        this.renderer.insertBefore(this.elementRef.nativeElement.parentNode, formGroupDiv, this.elementRef.nativeElement);
        this.renderer.appendChild(formGroupDiv, this.elementRef.nativeElement);
    }
}
SelectDirective.decorators = [
    { type: Directive, args: [{
                selector: '[bdSelect]'
            },] },
];
/** @nocollapse */
SelectDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: Renderer2, },
    { type: ElementRef, },
];
SelectDirective.propDecorators = {
    "label": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AutosizeDirective {
    /**
     * @param {?} elem
     */
    constructor(elem) {
        this.elem = elem;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.resize();
    }
    /**
     * @return {?}
     */
    resize() {
        const /** @type {?} */ textarea = /** @type {?} */ (this.elem.nativeElement);
        // Reset textarea height to auto that correctly calculate the new height
        textarea.style.height = 'auto';
        // Set new height
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
}
AutosizeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'textarea[autosize]',
                host: {
                    'rows': '1',
                    'style': 'overflow: hidden'
                }
            },] },
];
/** @nocollapse */
AutosizeDirective.ctorParameters = () => [
    { type: ElementRef, },
];
AutosizeDirective.propDecorators = {
    "resize": [{ type: HostListener, args: ['input',] }, { type: HostListener, args: ['load',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormErrorInterceptor {
    /**
     * @param {?} formErrorService
     */
    constructor(formErrorService) {
        this.formErrorService = formErrorService;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        return next.handle(req).do(() => {
        }, (err) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 400) {
                    const /** @type {?} */ errorObject = err.error;
                    if (errorObject.errors && errorObject.errors.children) {
                        const /** @type {?} */ objectKeys = Object.keys(errorObject.errors.children);
                        objectKeys.forEach((key) => {
                            const /** @type {?} */ property = errorObject.errors.children[key];
                            if (property.errors && property.errors.length > 0) {
                                property.errors.forEach((message) => {
                                    this.formErrorService.propertyError.next({ property_path: key, message: message });
                                });
                            }
                        });
                    }
                }
            }
        });
    }
}
FormErrorInterceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FormErrorInterceptor.ctorParameters = () => [
    { type: FormErrorService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CheckboxComponent extends FormInputComponent {
    /**
     * @param {?} _options
     * @param {?} formErrorService
     */
    constructor(_options, formErrorService) {
        super(_options);
        this._options = _options;
        this.formErrorService = formErrorService;
        this.placeholder = '';
        this.disableErrors = false;
        this.disabled = false;
        this.onChange = new EventEmitter();
        this.isChecked = false;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.isChecked;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this.isChecked = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.isChecked) {
            this.isChecked = value;
        }
    }
    /**
     * @param {?} isChecked
     * @return {?}
     */
    onInputChange(isChecked) {
        this.value = isChecked;
        this.onChange.emit(this.isChecked);
        this.onChangeCallback(this.value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
CheckboxComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => CheckboxComponent),
                        multi: true
                    }],
                selector: 'bd-checkbox',
                template: `<div class="{{ options.classFormGroup }}" [ngClass]="{'has-errors': errors.length}">



</div>

<div class="{{ options.classFormGroup }}">

  <div class="{{ options.classFromInput }}">

    <div class="{{ options.classFromLegend }}">

      <bd-form-label [label]="label" [inputId]="uniqueId"></bd-form-label>
      <bd-form-required [required]="requiredMarker" *ngIf="requiredMarker"></bd-form-required>
      <bd-form-tips [tips]="tips" *ngIf="tips"></bd-form-tips>

    </div>

    <div class="{{ inputGroupClass }}">

      <div class="checkbox">
        <label>
          <input [disabled]="disabled" type="checkbox"  [(ngModel)]="isChecked" #inputEl
                 (change)="onInputChange(inputEl.checked)"
                 ngDefaultControl /> <span *ngIf="label">{{ label }}</span>
        </label>
      </div>

    </div>
  </div>

  <bd-form-errors [errors]="errors" *ngIf="errors"></bd-form-errors>
  <bd-form-help [label]="help" *ngIf="help"></bd-form-help>
</div>

`
            },] },
];
/** @nocollapse */
CheckboxComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
];
CheckboxComponent.propDecorators = {
    "input": [{ type: ViewChild, args: [CheckboxControlValueAccessor,] },],
    "label": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "inputClass": [{ type: Input },],
    "disableErrors": [{ type: Input },],
    "disabled": [{ type: Input },],
    "formControl": [{ type: Input },],
    "onChange": [{ type: Output },],
    "isChecked": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatetimepickerComponent extends FormInputComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormLabelComponent {
    /**
     * @param {?} _options
     */
    constructor(_options) {
        this._options = _options;
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
}
FormLabelComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-label',
                template: `<label class="{{ options.classFormLabel }}" for="{{ inputId }}" *ngIf="label">{{ label }}</label>
`
            },] },
];
/** @nocollapse */
FormLabelComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
];
FormLabelComponent.propDecorators = {
    "label": [{ type: Input },],
    "inputId": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormErrorsComponent {
    /**
     * @param {?} _options
     */
    constructor(_options) {
        this._options = _options;
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
}
FormErrorsComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-errors',
                template: `<ul class="{{ options.classFormError }}" *ngIf="errors.length">
  <li *ngFor="let error of errors">
    {{ error | translate }}
  </li>
</ul>


`
            },] },
];
/** @nocollapse */
FormErrorsComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
];
FormErrorsComponent.propDecorators = {
    "errors": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormHelpComponent {
    /**
     * @param {?} _options
     */
    constructor(_options) {
        this._options = _options;
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
}
FormHelpComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-help',
                template: `<div class="{{ options.classFormHelp }}" *ngIf="label">
  {{ label | translate }}
</div>
`
            },] },
];
/** @nocollapse */
FormHelpComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
];
FormHelpComponent.propDecorators = {
    "label": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RteComponent extends FormInputComponent {
    /**
     * @param {?} _options
     * @param {?} formErrorService
     */
    constructor(_options, formErrorService) {
        super(_options);
        this._options = _options;
        this.formErrorService = formErrorService;
        this.rteConfig = {
            toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                // toggled buttons
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['clean'],
                ['link']
            ]
        };
        this.placeholder = '';
        this.disableErrors = false;
    }
    /**
     * @param {?} writeValue
     * @return {?}
     */
    writeValue(writeValue) {
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
    }
}
RteComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => RteComponent),
                        multi: true
                    }],
                selector: 'bd-rte',
                template: `<div class="{{ options.classFormGroup }}" [ngClass]="{'has-errors': errors.length}">

  <div class="{{ options.classFromInput }}">

    <div class="{{ options.classFromLegend }}">

      <bd-form-label [label]="label" [inputId]="uniqueId"></bd-form-label>
      <bd-form-required [required]="requiredMarker" *ngIf="requiredMarker"></bd-form-required>
      <bd-form-tips [tips]="tips" *ngIf="tips"></bd-form-tips>
      <bd-form-counter [maxLength]="maxLength" [form]="formControl" *ngIf="maxLength && options.counterBefore"></bd-form-counter>

    </div>

    <div class="{{ inputGroupClass }}">

      <quill-editor #editor [formControl]="formControl" [modules]="rteConfig"></quill-editor>

    </div>
  </div>

  <bd-form-errors [errors]="errors" *ngIf="errors"></bd-form-errors>
  <bd-form-counter [maxLength]="maxLength" [form]="formControl" *ngIf="maxLength && !options.counterBefore"></bd-form-counter>
  <bd-form-help [label]="help" *ngIf="help"></bd-form-help>
</div>
`
            },] },
];
/** @nocollapse */
RteComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
];
RteComponent.propDecorators = {
    "input": [{ type: ViewChild, args: [DefaultValueAccessor,] },],
    "editor": [{ type: ViewChild, args: [CKEditorComponent,] },],
    "rteConfig": [{ type: Input },],
    "label": [{ type: Input },],
    "help": [{ type: Input },],
    "inputClass": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "disableErrors": [{ type: Input },],
    "formControl": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormTipsComponent {
    /**
     * @param {?} _options
     */
    constructor(_options) {
        this._options = _options;
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
}
FormTipsComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-tips',
                template: `<ng-container *ngIf="tips && tips.length">
  <span *ngFor="let tip of tips">
    <i class="fas {{ tip.icon }}" popover="{{ tip.tooltip|translate }}"></i>
  </span>
</ng-container>
`
            },] },
];
/** @nocollapse */
FormTipsComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
];
FormTipsComponent.propDecorators = {
    "tips": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormRequiredComponent {
    /**
     * @param {?} _options
     * @param {?} _sanitizer
     */
    constructor(_options, _sanitizer) {
        this._options = _options;
        this._sanitizer = _sanitizer;
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
    /**
     * @return {?}
     */
    get requiredString() {
        return this._sanitizer.bypassSecurityTrustHtml(this.options.requiredString);
    }
}
FormRequiredComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-required',
                template: `<span class="{{ options.classFormRequired }}" *ngIf="required" [innerHTML]="requiredString"></span>
`
            },] },
];
/** @nocollapse */
FormRequiredComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: DomSanitizer, },
];
FormRequiredComponent.propDecorators = {
    "required": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MaxLengthDirective {
    /**
     * @param {?} _options
     * @param {?} renderer
     * @param {?} elementRef
     */
    constructor(_options, renderer, elementRef) {
        this._options = _options;
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.counter();
    }
    /**
     * @return {?}
     */
    counter() {
        const /** @type {?} */ counterDiv = this.renderer.createElement('div');
        this.renderer.addClass(counterDiv, this._options.classFormGroup);
        this.renderer.insertBefore(this.elementRef.nativeElement.parentNode, counterDiv, this.elementRef.nativeElement);
        this.renderer.appendChild(counterDiv, this.elementRef.nativeElement);
    }
}
MaxLengthDirective.decorators = [
    { type: Directive, args: [{
                selector: '[bd-maxlength]'
            },] },
];
/** @nocollapse */
MaxLengthDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: Renderer2, },
    { type: ElementRef, },
];
MaxLengthDirective.propDecorators = {
    "counter": [{ type: HostListener, args: ['input',] }, { type: HostListener, args: ['load',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormCounterComponent {
    /**
     * @param {?} _options
     */
    constructor(_options) {
        this._options = _options;
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
    /**
     * @return {?}
     */
    getMaxLenghtLabel() {
        const /** @type {?} */ length = this.maxLength - this.form.value.length;
        return this._options.maxLengthString.replace('%s', length.toString());
    }
}
FormCounterComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-counter',
                template: `<span class="{{ options.classFormCounter }}">
  {{ getMaxLenghtLabel() }}
</span>
`
            },] },
];
/** @nocollapse */
FormCounterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
];
FormCounterComponent.propDecorators = {
    "maxLength": [{ type: Input },],
    "form": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormAddonComponent {
    /**
     * @param {?} _options
     * @param {?} _sanitizer
     */
    constructor(_options, _sanitizer) {
        this._options = _options;
        this._sanitizer = _sanitizer;
    }
    /**
     * @return {?}
     */
    get hostClasses() {
        return this.position === 'prepend' ? this.options.classFormInputGroupPrepend : this.options.classFormInputGroupAppend;
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
    /**
     * @return {?}
     */
    get addonString() {
        return this._sanitizer.bypassSecurityTrustHtml(this.text);
    }
}
FormAddonComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-addon',
                template: `<span class="{{ options.classFormInputGroupText }}" [innerHTML]="addonString"></span>
`,
            },] },
];
/** @nocollapse */
FormAddonComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: DomSanitizer, },
];
FormAddonComponent.propDecorators = {
    "text": [{ type: Input },],
    "position": [{ type: Input },],
    "hostClasses": [{ type: HostBinding, args: ['class',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

const DefaultFormUtilitiesOptions = {
    displayErrors: true,
    classFormGroup: 'form-group',
    classFromInput: 'form-input',
    classFormInputGroup: 'input-group',
    classFormInputGroupPrepend: 'input-group-prepend',
    classFormInputGroupAppend: 'input-group-append',
    classFormInputGroupText: 'input-group-text',
    classFromLegend: 'form-legend',
    classFormLabel: 'form-label',
    classFormControl: 'form-control',
    classFormCounter: 'form-counter',
    classFormError: 'form-errors',
    classFormHelp: 'form-help',
    classFormRequired: 'form-required',
    classIconBase: 'far',
    requiredString: '*',
    maxLengthString: 'Noch %s Zeichen',
    minLengthString: 'Es fehlen noch %s Zeichen',
    counterBefore: true
};
class FormUtilitiesModule {
    /**
     * @param {?=} options
     * @return {?}
     */
    static forRoot(options = { displayErrors: true }) {
        return {
            ngModule: FormUtilitiesModule,
            providers: [
                FormErrorService,
                { provide: 'options', useValue: options || DefaultFormUtilitiesOptions },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: FormErrorInterceptor,
                    multi: true
                }
            ]
        };
    }
}
FormUtilitiesModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    NgSelectModule,
                    CKEditorModule,
                    TranslateModule,
                    TooltipModule.forRoot(),
                    PopoverModule.forRoot(),
                    BsDatepickerModule.forRoot(),
                    TimepickerModule.forRoot(),
                    QuillModule
                ],
                declarations: [
                    InputComponent,
                    DatepickerComponent,
                    DaterangeComponent,
                    TextareaComponent,
                    CkeditorComponent,
                    RteComponent,
                    SelectDirective,
                    ProgressButtonComponent,
                    CheckboxComponent,
                    DatetimepickerComponent,
                    AutosizeDirective,
                    MaxLengthDirective,
                    FormLabelComponent,
                    FormErrorsComponent,
                    FormHelpComponent,
                    FormTipsComponent,
                    FormRequiredComponent,
                    FormCounterComponent,
                    FormAddonComponent
                ],
                exports: [
                    NgSelectModule,
                    InputComponent,
                    DatepickerComponent,
                    DaterangeComponent,
                    TextareaComponent,
                    CkeditorComponent,
                    RteComponent,
                    SelectDirective,
                    ProgressButtonComponent,
                    CheckboxComponent,
                    DatetimepickerComponent,
                    AutosizeDirective,
                    MaxLengthDirective,
                    FormLabelComponent,
                    FormErrorsComponent,
                    FormHelpComponent,
                    FormTipsComponent,
                    FormRequiredComponent,
                    FormCounterComponent,
                    FormAddonComponent
                ],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isEmail = (c) => {
    return EMAIL_REGEX.test(c.value) ? null : { email: true };
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { InputComponent, DatepickerComponent, DaterangeComponent, TextareaComponent, CkeditorComponent, ProgressButtonComponent, SelectDirective, AutosizeDirective, FormErrorService, FormUtilitiesModule, DefaultFormUtilitiesOptions, isEmail, CheckboxComponent as ɵd, DatetimepickerComponent as ɵe, FormInputComponent as ɵb, RteComponent as ɵc, FormAddonComponent as ɵm, FormCounterComponent as ɵl, FormErrorsComponent as ɵh, FormHelpComponent as ɵi, FormLabelComponent as ɵg, FormRequiredComponent as ɵk, FormTipsComponent as ɵj, MaxLengthDirective as ɵf, FormErrorInterceptor as ɵn };
//# sourceMappingURL=braune-digital-form-utilities.js.map
