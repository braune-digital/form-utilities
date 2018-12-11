import { __extends } from 'tslib';
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

var FormInputComponent = /** @class */ (function () {
    function FormInputComponent(_options) {
        this._options = _options;
        this.displayErrors = false;
        this.requiredMarker = false;
        this.disabled = false;
        this.uniqueId = '_' + Math.random().toString(36).substr(2, 9);
    }
    Object.defineProperty(FormInputComponent.prototype, "errors", {
        get: function () {
            var _this = this;
            if ((this.options.displayErrors || this.displayErrors)
                && this.formControl
                && this.formControl.touched
                && this.formControl.errors) {
                return Object.keys(this.formControl.errors).map(function (key) {
                    if (key.substr(0, FormInputComponent.REMOTE_ERROR_PREFIX.length) == FormInputComponent.REMOTE_ERROR_PREFIX) {
                        return _this.formControl.errors[key];
                    }
                    return FormInputComponent.ERROR_PREFIX + '.' + key;
                });
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    FormInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formErrorServiceSubscription = this.formErrorService.propertyError.subscribe(function (error) {
            if (_this.formControl && _this.formControl.root) {
                var control = _this.formControl.root.get(error.property_path);
                var errorKey = _this.getErrorKey(error.property_path);
                if (control && !control.hasError(errorKey)) {
                    control.setErrors(Object.assign({}, control.errors, (_a = {}, _a[errorKey] = error.message, _a)));
                }
            }
            var _a;
        });
    };
    FormInputComponent.prototype.ngOnDestroy = function () {
        this.formErrorServiceSubscription.unsubscribe();
    };
    FormInputComponent.prototype.writeValue = function (value) {
        this.input.writeValue(value);
    };
    FormInputComponent.prototype.registerOnChange = function (fn) {
        this.input.registerOnChange(fn);
    };
    FormInputComponent.prototype.registerOnTouched = function (fn) {
        this.input.registerOnTouched(fn);
    };
    FormInputComponent.prototype.setDisabledState = function (isDisabled) {
        this.input.setDisabledState(isDisabled);
    };
    Object.defineProperty(FormInputComponent.prototype, "inputGroupClass", {
        get: function () {
            if (this.prepend) {
                return this._options.classFormInputGroup + ' ' + this._options.classFormInputGroup + '--prepend';
            }
            if (this.append) {
                return this._options.classFormInputGroup + ' ' + this._options.classFormInputGroup + '--append';
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    FormInputComponent.prototype.getErrorKey = function (propertyPath) {
        return FormInputComponent.REMOTE_ERROR_PREFIX + propertyPath.split('.').pop();
    };
    Object.defineProperty(FormInputComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormInputComponent.prototype, "focus", {
        get: function () {
            return this._focus;
        },
        set: function (value) {
            this._focus = value;
        },
        enumerable: true,
        configurable: true
    });
    return FormInputComponent;
}());
FormInputComponent.REMOTE_ERROR_PREFIX = 'remote_';
FormInputComponent.ERROR_PREFIX = 'form.errors';
FormInputComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
]; };
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
var FormErrorService = /** @class */ (function () {
    function FormErrorService() {
        this.propertyError = new Subject();
        this.formError = new Subject();
    }
    return FormErrorService;
}());
FormErrorService.decorators = [
    { type: Injectable },
];
var InputComponent = /** @class */ (function (_super) {
    __extends(InputComponent, _super);
    function InputComponent(_options, formErrorService) {
        var _this = _super.call(this, _options) || this;
        _this._options = _options;
        _this.formErrorService = formErrorService;
        _this.placeholder = '';
        _this.type = 'text';
        _this.step = '';
        _this.disableErrors = false;
        _this.onInputKeypress = new EventEmitter();
        _this.onInputChange = new EventEmitter();
        _this.onInputKeyup = new EventEmitter();
        _this.onFocus = new EventEmitter();
        _this.onFocusOut = new EventEmitter();
        return _this;
    }
    InputComponent.prototype.handleOnInputKeypress = function (value) {
        this.onInputKeypress.emit(value);
    };
    InputComponent.prototype.handleOnInputChange = function (value) {
        this.onInputChange.emit(value);
    };
    InputComponent.prototype.handleOnInputKeyup = function (value) {
        this.onInputKeyup.emit(value);
    };
    InputComponent.prototype.handleOnFocus = function (value) {
        this.focus = true;
        this.onFocus.emit(value);
    };
    InputComponent.prototype.handleOnFocusOut = function (value) {
        this.focus = false;
        this.onFocusOut.emit(value);
    };
    return InputComponent;
}(FormInputComponent));
InputComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return InputComponent; }),
                        multi: true
                    }],
                selector: 'bd-input',
                template: "<div class=\"{{ options.classFormGroup }}\" [ngClass]=\"{'focus': focus, 'has-errors': errors.length}\">\n\n  <div class=\"{{ options.classFromInput }}\">\n\n    <div class=\"{{ options.classFromLegend }}\">\n\n      <bd-form-label [label]=\"label\" [inputId]=\"uniqueId\"></bd-form-label>\n      <bd-form-required [required]=\"requiredMarker\" *ngIf=\"requiredMarker\"></bd-form-required>\n      <bd-form-tips [tips]=\"tips\" *ngIf=\"tips\"></bd-form-tips>\n      <bd-form-counter [maxLength]=\"maxLength\" [form]=\"formControl\" *ngIf=\"maxLength && options.counterBefore\"></bd-form-counter>\n\n    </div>\n\n    <div class=\"{{ inputGroupClass }}\">\n\n      <bd-form-addon [text]=\"prepend\" position=\"prepend\" *ngIf=\"prepend\"></bd-form-addon>\n\n      <input [disabled]=\"disabled\"\n             [type]=\"type\"\n             [step]=\"step\"\n             class=\"{{ options.classFormControl }} {{ inputClass }}\"\n             [placeholder]=\"placeholder\"\n             [attr.id]=\"uniqueId\"\n             [attr.maxlength]=\"maxLength\"\n             [attr.aria-label]=\"placeholder\"\n             (focusout)=\"handleOnFocusOut($event.target.value)\"\n             (focus)=\"handleOnFocus($event.target.value)\"\n             (change)=\"handleOnInputChange($event.target.value)\"\n             (keypress)=\"handleOnInputKeypress($event.target.value)\"\n             (keyup)=\"handleOnInputKeyup($event.target.value)\"\n             ngDefaultControl>\n\n      <bd-form-addon [text]=\"append\" position=\"append\" *ngIf=\"append\"></bd-form-addon>\n\n    </div>\n  </div>\n\n  <bd-form-errors [errors]=\"errors\"></bd-form-errors>\n  <bd-form-counter [maxLength]=\"maxLength\" [form]=\"formControl\" *ngIf=\"maxLength && !options.counterBefore\"></bd-form-counter>\n  <bd-form-help [label]=\"help\" *ngIf=\"help\"></bd-form-help>\n</div>\n"
            },] },
];
InputComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
]; };
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
var DatepickerComponent = /** @class */ (function (_super) {
    __extends(DatepickerComponent, _super);
    function DatepickerComponent(_options, formErrorService, langService) {
        var _this = _super.call(this, _options) || this;
        _this._options = _options;
        _this.formErrorService = formErrorService;
        _this.langService = langService;
        _this.placeholder = '';
        _this.disableErrors = false;
        _this.bsConfig = new BsDatepickerConfig();
        _this.bsLang = 'en';
        _this.bsMaxDate = null;
        _this.bsMinDate = null;
        return _this;
    }
    DatepickerComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.langService.use(this.bsLang);
        if (this.disabled) {
            this.formControl.disable();
        }
    };
    return DatepickerComponent;
}(FormInputComponent));
DatepickerComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return DatepickerComponent; }),
                        multi: true
                    }],
                selector: 'bd-datepicker',
                template: "<div class=\"{{ options.classFormGroup }}\" [ngClass]=\"{'has-errors': errors.length}\">\n\n  <div class=\"{{ options.classFromInput }}\">\n\n    <div class=\"{{ options.classFromLegend }}\">\n\n      <bd-form-label [label]=\"label\" [inputId]=\"uniqueId\"></bd-form-label>\n      <bd-form-required [required]=\"requiredMarker\" *ngIf=\"requiredMarker\"></bd-form-required>\n      <bd-form-tips [tips]=\"tips\" *ngIf=\"tips\"></bd-form-tips>\n\n    </div>\n\n    <div class=\"{{ inputGroupClass }}\">\n\n      <bd-form-addon [text]=\"prepend\" position=\"prepend\" *ngIf=\"prepend\"></bd-form-addon>\n\n      <input #dp\n             type=\"text\"\n             class=\"{{ options.classFormControl }} {{ inputClass }}\"\n             bsDatepicker\n             [bsConfig]=\"bsConfig\"\n             [formControl]=\"formControl\"\n             [placeholder]=\"placeholder\"\n             [attr.id]=\"uniqueId\"\n             [attr.maxlength]=\"maxLength\"\n             [attr.aria-label]=\"placeholder\"\n             [minDate]=\"bsMinDate\"\n             [maxDate]=\"bsMaxDate\"\n             [bsValue]=\"bsValue\">\n\n      <bd-form-addon [text]=\"append\" position=\"append\" *ngIf=\"append\"></bd-form-addon>\n\n    </div>\n  </div>\n\n  <bd-form-errors [errors]=\"errors\" *ngIf=\"errors\"></bd-form-errors>\n  <bd-form-help [label]=\"help\" *ngIf=\"help\"></bd-form-help>\n</div>\n"
            },] },
];
DatepickerComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
    { type: BsLocaleService, },
]; };
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
var DaterangeComponent = /** @class */ (function (_super) {
    __extends(DaterangeComponent, _super);
    function DaterangeComponent(_options, formErrorService, langService) {
        var _this = _super.call(this, _options) || this;
        _this._options = _options;
        _this.formErrorService = formErrorService;
        _this.langService = langService;
        _this.placeholder = '';
        _this.disableErrors = false;
        _this.bsConfig = new BsDatepickerConfig();
        _this.bsLang = 'en';
        _this.bsMaxDate = null;
        _this.bsMinDate = null;
        return _this;
    }
    DaterangeComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.langService.use(this.bsLang);
    };
    return DaterangeComponent;
}(FormInputComponent));
DaterangeComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return DaterangeComponent; }),
                        multi: true
                    }],
                selector: 'bd-daterange',
                template: "<div class=\"{{ options.classFormGroup }}\" [ngClass]=\"{'has-errors': errors.length}\">\n  <bd-form-label [label]=\"label\"></bd-form-label>\n\n  <input #dp\n         type=\"text\"\n         class=\"{{ options.classFormControl }} {{ inputClass }}\"\n         bsDaterangepicker\n         [bsConfig]=\"bsConfig\"\n         [formControl]=\"formControl\"\n         [placeholder]=\"placeholder\"\n         [minDate]=\"bsMinDate\"\n         [maxDate]=\"bsMaxDate\"\n  >\n\n  <bd-form-errors [errors]=\"errors\"></bd-form-errors>\n  <bd-form-help [label]=\"help\"></bd-form-help>\n\n</div>\n\n<div class=\"{{ options.classFormGroup }}\">\n\n  <div class=\"{{ options.classFromInput }}\">\n\n    <div class=\"{{ options.classFromLegend }}\">\n\n      <bd-form-label [label]=\"label\" [inputId]=\"uniqueId\"></bd-form-label>\n      <bd-form-required [required]=\"requiredMarker\" *ngIf=\"requiredMarker\"></bd-form-required>\n      <bd-form-tips [tips]=\"tips\" *ngIf=\"tips\"></bd-form-tips>\n\n    </div>\n\n    <div class=\"{{ inputGroupClass }}\">\n\n      <bd-form-addon [text]=\"prepend\" position=\"prepend\" *ngIf=\"prepend\"></bd-form-addon>\n\n      <input #dp\n             type=\"text\"\n             class=\"{{ options.classFormControl }} {{ inputClass }}\"\n             bsDaterangepicker\n             [bsConfig]=\"bsConfig\"\n             [formControl]=\"formControl\"\n             [placeholder]=\"placeholder\"\n             [attr.id]=\"uniqueId\"\n             [attr.maxlength]=\"maxLength\"\n             [attr.aria-label]=\"placeholder\"\n             [minDate]=\"bsMinDate\"\n             [maxDate]=\"bsMaxDate\"\n      >\n\n      <bd-form-addon [text]=\"append\" position=\"append\" *ngIf=\"append\"></bd-form-addon>\n    </div>\n  </div>\n\n  <bd-form-errors [errors]=\"errors\" *ngIf=\"errors\"></bd-form-errors>\n  <bd-form-help [label]=\"help\" *ngIf=\"help\"></bd-form-help>\n</div>\n",
                styles: ["::ng-deep .bs-datepicker{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;background:#fff;-webkit-box-shadow:0 0 10px 0 #aaa;box-shadow:0 0 10px 0 #aaa;position:relative;z-index:1}::ng-deep .bs-datepicker:after{clear:both;content:'';display:block}::ng-deep .bs-datepicker bs-day-picker{float:left}::ng-deep .bs-datepicker button:active,::ng-deep .bs-datepicker button:focus,::ng-deep .bs-datepicker button:hover,::ng-deep .bs-datepicker input:active,::ng-deep .bs-datepicker input:focus,::ng-deep .bs-datepicker input:hover,::ng-deep .bs-datepicker-btns button:active,::ng-deep .bs-datepicker-btns button:focus,::ng-deep .bs-datepicker-btns button:hover,::ng-deep .bs-datepicker-predefined-btns button:active,::ng-deep .bs-datepicker-predefined-btns button:focus{outline:0}::ng-deep .bs-datepicker-head{min-width:270px;height:50px;padding:10px;border-radius:3px 3px 0 0;text-align:justify}::ng-deep .bs-datepicker-head:after{content:\"\";display:inline-block;vertical-align:top;width:100%}::ng-deep .bs-datepicker-head button{display:inline-block;vertical-align:top;padding:0;height:30px;line-height:30px;border:0;background:0 0;text-align:center;cursor:pointer;color:#fff;-webkit-transition:.3s;transition:.3s}::ng-deep .bs-datepicker-head button[disabled],::ng-deep .bs-datepicker-head button[disabled]:active,::ng-deep .bs-datepicker-head button[disabled]:hover{background:rgba(221,221,221,.3);color:#f5f5f5;cursor:not-allowed}::ng-deep .bs-datepicker-head button.next,::ng-deep .bs-datepicker-head button.previous{border-radius:50%;width:30px;height:30px}::ng-deep .bs-datepicker-head button.next span,::ng-deep .bs-datepicker-head button.previous span{font-size:28px;line-height:1;display:inline-block;position:relative;height:100%;width:100%;border-radius:50%}::ng-deep .bs-datepicker-head button.current{border-radius:15px;max-width:155px;padding:0 13px}::ng-deep .bs-datepicker-head button:hover{background-color:rgba(0,0,0,.1)}::ng-deep .bs-datepicker-head button:active{background-color:rgba(0,0,0,.2)}::ng-deep .bs-datepicker-body{padding:10px;border-radius:0 0 3px 3px;min-height:232px;min-width:278px;border:1px solid #e9edf0}::ng-deep .bs-datepicker-body .days.weeks{position:relative;z-index:1}::ng-deep .bs-datepicker-body table{width:100%;border-collapse:separate;border-spacing:0}::ng-deep .bs-datepicker-body table th{font-size:13px;color:#9aaec1;font-weight:400;text-align:center}::ng-deep .bs-datepicker-body table td{color:#54708b;text-align:center;position:relative;padding:0}::ng-deep .bs-datepicker-body table td span{display:block;margin:0 auto;font-size:13px;border-radius:50%;position:relative;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}::ng-deep .bs-datepicker-body table td:not(.disabled) span{cursor:pointer}::ng-deep .bs-datepicker-body table td span.is-highlighted:not(.disabled):not(.selected),::ng-deep .bs-datepicker-body table td.is-highlighted:not(.disabled):not(.selected) span{background-color:#e9edf0;-webkit-transition:0s;transition:0s}::ng-deep .bs-datepicker-body table td span.disabled,::ng-deep .bs-datepicker-body table td.disabled span{color:#9aaec1}::ng-deep .bs-datepicker-body table td span.selected,::ng-deep .bs-datepicker-body table td.selected span{color:#fff}::ng-deep .bs-datepicker-body table td.active{position:relative}::ng-deep .bs-datepicker-body table td.active.select-start:before{left:35%}::ng-deep .bs-datepicker-body table td.active.select-end:before{left:-85%}::ng-deep .bs-datepicker-body table td span.active.select-end:after,::ng-deep .bs-datepicker-body table td span.active.select-start:after,::ng-deep .bs-datepicker-body table td.active.select-end span:after,::ng-deep .bs-datepicker-body table td.active.select-start span:after{content:\"\";display:block;position:absolute;z-index:-1;width:100%;height:100%;-webkit-transition:.3s;transition:.3s;top:0;border-radius:50%}::ng-deep .bs-datepicker-body table td span:before,::ng-deep .bs-datepicker-body table td:before{content:\"\";display:block;position:absolute;z-index:-1;top:6px;bottom:6px;left:-2px;right:-2px;-webkit-box-sizing:content-box;box-sizing:content-box;background:0 0}::ng-deep .bs-datepicker-body table td.active.select-start+td.active:before{left:-20%}::ng-deep .bs-datepicker-body table td:last-child.active:before{border-radius:0 3px 3px 0;width:125%;left:-25%}::ng-deep .bs-datepicker-body table td span[class*=select-],::ng-deep .bs-datepicker-body table td[class*=select-] span{border-radius:50%;color:#fff}::ng-deep .bs-datepicker-body table.days span.active:not(.select-start):before,::ng-deep .bs-datepicker-body table.days span.in-range:not(.select-start):before,::ng-deep .bs-datepicker-body table.days td.active:not(.select-start):before,::ng-deep .bs-datepicker-body table.days td.in-range:not(.select-start):before{background:#e9edf0}::ng-deep .bs-datepicker-body table.days span{width:32px;height:32px;line-height:32px}::ng-deep .bs-datepicker-body table.days span.select-start{z-index:2}::ng-deep .bs-datepicker-body table.days span.in-range.select-end:before,::ng-deep .bs-datepicker-body table.days span.is-highlighted.in-range:before{background:0 0;right:0;left:0}::ng-deep .bs-datepicker-body table.days td.active+td.is-highlighted:before,::ng-deep .bs-datepicker-body table.days td.active+td.select-end:before,::ng-deep .bs-datepicker-body table.days td.in-range+td.is-highlighted:before,::ng-deep .bs-datepicker-body table.days td.in-range+td.select-end:before,::ng-deep .bs-datepicker-body table.days td.select-start+td.is-highlighted:before,::ng-deep .bs-datepicker-body table.days td.select-start+td.select-end:before{background:#e9edf0;width:100%}::ng-deep .bs-datepicker-body table.weeks tr td:nth-child(2).active:before{border-radius:3px 0 0 3px;left:0;width:100%}::ng-deep .bs-datepicker-body table:not(.weeks) tr td:first-child:before{border-radius:3px 0 0 3px}::ng-deep .bs-datepicker-body table.years td span{width:46px;height:46px;line-height:45px;margin:0 auto}::ng-deep .bs-datepicker-body table.years tr:not(:last-child) td span{margin-bottom:8px}::ng-deep .bs-datepicker-body table.months td{height:52px}::ng-deep .bs-datepicker-body table.months td span{padding:6px;border-radius:15px}::ng-deep .bs-datepicker .current-timedate{color:#54708b;font-size:15px;text-align:center;height:30px;line-height:30px;border-radius:20px;border:1px solid #e9edf0;margin-bottom:10px;cursor:pointer;text-transform:uppercase;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}::ng-deep .bs-datepicker .current-timedate span:not(:empty):before{content:\"\";width:15px;height:16px;display:inline-block;margin-right:4px;vertical-align:text-bottom;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAABMklEQVQoU9VTwW3CQBCcOUgBtEBKSAukAnBKME+wFCAlYIhk8sQlxFABtJAScAsuAPBEewYcxCP8ouxrPDsza61uiVN1o6RNHD4htSCmq49RfO71BvMJqBBkITRf1kmUW49nQRC9h1I5AZlBClaL8aP1fKgOOxCx8aSLs+Q19eZuNO8QmPqJRtDFguy7OAcDbJPs+/BKVPDIPrvD2ZJgWAmVe7O0rI0Vqs1seyWUXpuJoppYCa5L+U++NpNPkr5OE2oMdARsb3gykJT5ydZcL8Z9Ww60nxg2LhjON9li9OwXZzo+xLbp3nC2s9CL2RrueGyVrgwNm8HpsCzZ9EEW6kqXlo1GQe03FzP/7W8Hl0dBtu7Bf7zt6mIwvX1RvzDCm7+q3mAW0Dl/GPdUCeXrZLT9BrDrGkm4qlPvAAAAAElFTkSuQmCC)}::ng-deep .bs-datepicker-multiple{display:inline-block;border-radius:4px 0 0 4px}::ng-deep .bs-datepicker-multiple+::ng-deep .bs-datepicker-multiple{margin-left:10px}::ng-deep .bs-datepicker-multiple .bs-datepicker{-webkit-box-shadow:none;box-shadow:none;position:relative}::ng-deep .bs-datepicker-multiple .bs-datepicker:not(:last-child){padding-right:10px}::ng-deep .bs-datepicker-multiple .bs-datepicker+.bs-datepicker:after{content:\"\";display:block;width:14px;height:10px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAKCAYAAABrGwT5AAAA1ElEQVQoU42RsQrCUAxF77VuDu7O4oMWW//BURBBpZvgKk4uIrjoqKOTf+DopIO4uYggtFTfw3+pkQqCW1/G5J7kJiFy4m5MxUlxAzgIPHX+lzMPzupRYlYgxiR7vqsOP8YKzsTx0yxFMCUZ+q7aZzlr+OvgoWcAFyAHgat2jLWu48252DdqAihDJGSSJNUUxYmQjs3+hPQBlAh2rG2LCOPnaw3IiGDX99TRCs7ASJsNhUOA7d/LcuHvRG22FIZvsNXw1MX6VZExCilOQKEfeLXr/10+aC9Ho7arh7oAAAAASUVORK5CYII=);position:absolute;top:25px;left:-8px}::ng-deep .bs-datepicker-multiple .bs-datepicker .left{float:left}::ng-deep .bs-datepicker-multiple .bs-datepicker .right{float:right}::ng-deep .bs-datepicker-container{padding:15px}::ng-deep .bs-datepicker-custom-range{padding:15px;background:#eee}::ng-deep .bs-datepicker-predefined-btns button{width:100%;display:block;height:30px;background-color:#9aaec1;border-radius:4px;color:#fff;border:0;margin-bottom:10px;padding:0 18px;text-align:left;-webkit-transition:.3s;transition:.3s}::ng-deep .bs-datepicker-predefined-btns button:active,::ng-deep .bs-datepicker-predefined-btns button:hover{background-color:#54708b}::ng-deep .bs-datepicker .is-other-month{color:rgba(0,0,0,.25)}::ng-deep .bs-datepicker-buttons{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;padding-top:10px;border-top:1px solid #e9edf0}::ng-deep .bs-datepicker-buttons .btn-default{margin-left:10px}::ng-deep .bs-timepicker-container{padding:10px 0}::ng-deep .bs-timepicker-label{color:#54708b;margin-bottom:10px}::ng-deep .bs-timepicker-controls{display:inline-block;vertical-align:top;margin-right:10px}::ng-deep .bs-timepicker-controls button{width:20px;height:20px;border-radius:50%;border:0;background-color:#e9edf0;color:#54708b;font-size:16px;font-weight:700;vertical-align:middle;line-height:0;padding:0;-webkit-transition:.3s;transition:.3s}::ng-deep .bs-timepicker-controls button:hover{background-color:#d5dadd}::ng-deep .bs-timepicker-controls input{width:35px;height:25px;border-radius:13px;text-align:center;border:1px solid #e9edf0}::ng-deep .bs-timepicker .switch-time-format{text-transform:uppercase;min-width:54px;height:25px;border-radius:20px;border:1px solid #e9edf0;background:#fff;color:#54708b;font-size:13px}::ng-deep .bs-timepicker .switch-time-format img{vertical-align:initial;margin-left:4px}::ng-deep bs-datepicker-container,::ng-deep bs-daterangepicker-container{z-index:1080}@media (max-width:768px){::ng-deep .bs-datepicker-multiple{display:-webkit-box;display:-ms-flexbox;display:flex}::ng-deep .bs-datepicker-multiple+::ng-deep .bs-datepicker-multiple{margin-top:10px;margin-left:0}}::ng-deep .theme-default .bs-datepicker-head{background-color:#777}::ng-deep .theme-default .bs-datepicker-body table td span.selected,::ng-deep .theme-default .bs-datepicker-body table td span[class*=select-]:after,::ng-deep .theme-default .bs-datepicker-body table td.selected span,::ng-deep .theme-default .bs-datepicker-body table td[class*=select-] span:after{background-color:#777}::ng-deep .theme-default .bs-datepicker-body table td.week span{color:#777}::ng-deep .theme-green .bs-datepicker-head{background-color:#5cb85c}::ng-deep .theme-green .bs-datepicker-body table td span.selected,::ng-deep .theme-green .bs-datepicker-body table td span[class*=select-]:after,::ng-deep .theme-green .bs-datepicker-body table td.selected span,::ng-deep .theme-green .bs-datepicker-body table td[class*=select-] span:after{background-color:#5cb85c}::ng-deep .theme-green .bs-datepicker-body table td.week span{color:#5cb85c}::ng-deep .theme-blue .bs-datepicker-head{background-color:#5bc0de}::ng-deep .theme-blue .bs-datepicker-body table td span.selected,::ng-deep .theme-blue .bs-datepicker-body table td span[class*=select-]:after,::ng-deep .theme-blue .bs-datepicker-body table td.selected span,::ng-deep .theme-blue .bs-datepicker-body table td[class*=select-] span:after{background-color:#5bc0de}::ng-deep .theme-blue .bs-datepicker-body table td.week span{color:#5bc0de}::ng-deep .theme-dark-blue .bs-datepicker-head{background-color:#337ab7}::ng-deep .theme-dark-blue .bs-datepicker-body table td span.selected,::ng-deep .theme-dark-blue .bs-datepicker-body table td span[class*=select-]:after,::ng-deep .theme-dark-blue .bs-datepicker-body table td.selected span,::ng-deep .theme-dark-blue .bs-datepicker-body table td[class*=select-] span:after{background-color:#337ab7}::ng-deep .theme-dark-blue .bs-datepicker-body table td.week span{color:#337ab7}::ng-deep .theme-red .bs-datepicker-head{background-color:#d9534f}::ng-deep .theme-red .bs-datepicker-body table td span.selected,::ng-deep .theme-red .bs-datepicker-body table td span[class*=select-]:after,::ng-deep .theme-red .bs-datepicker-body table td.selected span,::ng-deep .theme-red .bs-datepicker-body table td[class*=select-] span:after{background-color:#d9534f}::ng-deep .theme-red .bs-datepicker-body table td.week span{color:#d9534f}::ng-deep .theme-orange .bs-datepicker-head{background-color:#f0ad4e}::ng-deep .theme-orange .bs-datepicker-body table td span.selected,::ng-deep .theme-orange .bs-datepicker-body table td span[class*=select-]:after,::ng-deep .theme-orange .bs-datepicker-body table td.selected span,::ng-deep .theme-orange .bs-datepicker-body table td[class*=select-] span:after{background-color:#f0ad4e}::ng-deep .theme-orange .bs-datepicker-body table td.week span{color:#f0ad4e}"]
            },] },
];
DaterangeComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
    { type: BsLocaleService, },
]; };
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
var TextareaComponent = /** @class */ (function (_super) {
    __extends(TextareaComponent, _super);
    function TextareaComponent(_options, formErrorService) {
        var _this = _super.call(this, _options) || this;
        _this._options = _options;
        _this.formErrorService = formErrorService;
        _this.placeholder = '';
        _this.disableErrors = false;
        return _this;
    }
    return TextareaComponent;
}(FormInputComponent));
TextareaComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return TextareaComponent; }),
                        multi: true
                    }],
                selector: 'bd-textarea',
                template: "<div class=\"{{ options.classFormGroup }}\" [ngClass]=\"{'has-errors': errors.length}\">\n\n  <div class=\"{{ options.classFromInput }}\">\n\n    <div class=\"{{ options.classFromLegend }}\">\n\n      <bd-form-label [label]=\"label\" [inputId]=\"uniqueId\"></bd-form-label>\n      <bd-form-required [required]=\"requiredMarker\" *ngIf=\"requiredMarker\"></bd-form-required>\n      <bd-form-tips [tips]=\"tips\" *ngIf=\"tips\"></bd-form-tips>\n      <bd-form-counter [maxLength]=\"maxLength\" [form]=\"formControl\" *ngIf=\"maxLength && options.counterBefore\"></bd-form-counter>\n\n    </div>\n\n    <div class=\"{{ inputGroupClass }}\">\n\n      <bd-form-addon [text]=\"prepend\" position=\"prepend\" *ngIf=\"prepend\"></bd-form-addon>\n\n      <textarea [disabled]=\"disabled\"\n                class=\"{{ options.classFormControl }} {{ inputClass }}\"\n                [placeholder]=\"placeholder\"\n                [attr.id]=\"uniqueId\"\n                [attr.maxlength]=\"maxLength\"\n                [attr.aria-label]=\"placeholder\"\n                autosize\n                ngDefaultControl>\n      </textarea>\n\n      <bd-form-addon [text]=\"append\" position=\"append\" *ngIf=\"append\"></bd-form-addon>\n\n    </div>\n  </div>\n\n  <bd-form-errors [errors]=\"errors\" *ngIf=\"errors\"></bd-form-errors>\n  <bd-form-counter [maxLength]=\"maxLength\" [form]=\"formControl\" *ngIf=\"maxLength && !options.counterBefore\"></bd-form-counter>\n  <bd-form-help [label]=\"help\" *ngIf=\"help\"></bd-form-help>\n</div>\n"
            },] },
];
TextareaComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
]; };
TextareaComponent.propDecorators = {
    "input": [{ type: ViewChild, args: [DefaultValueAccessor,] },],
    "label": [{ type: Input },],
    "help": [{ type: Input },],
    "inputClass": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "disableErrors": [{ type: Input },],
    "formControl": [{ type: Input },],
};
var CkeditorComponent = /** @class */ (function (_super) {
    __extends(CkeditorComponent, _super);
    function CkeditorComponent(_options, formErrorService) {
        var _this = _super.call(this, _options) || this;
        _this._options = _options;
        _this.formErrorService = formErrorService;
        _this.ckeditorConfig = {
            'skin': 'moono-lisa',
            'toolbar': [
                {
                    name: 'bd-form', items: ['Format', '-', 'Source', '-', 'Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', '-', 'Link']
                }
            ]
        };
        _this.placeholder = '';
        _this.disableErrors = false;
        return _this;
    }
    CkeditorComponent.prototype.onEditorChange = function (_value) {
        this.onChange(_value);
    };
    CkeditorComponent.prototype.writeValue = function (value) {
        this.editor.value = value;
    };
    CkeditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CkeditorComponent.prototype.registerOnTouched = function (fn) {
        this.input.registerOnTouched(fn);
    };
    CkeditorComponent.prototype.setDisabledState = function (isDisabled) {
        this.input.setDisabledState(isDisabled);
    };
    return CkeditorComponent;
}(FormInputComponent));
CkeditorComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return CkeditorComponent; }),
                        multi: true
                    }],
                selector: 'bd-ckeditor',
                template: "<div class=\"{{ options.classFormGroup }}\" [ngClass]=\"{'has-errors': errors.length}\">\n\n  <div class=\"{{ options.classFromInput }}\">\n\n    <div class=\"{{ options.classFromLegend }}\">\n\n      <bd-form-label [label]=\"label\" [inputId]=\"uniqueId\"></bd-form-label>\n      <bd-form-required [required]=\"requiredMarker\" *ngIf=\"requiredMarker\"></bd-form-required>\n      <bd-form-tips [tips]=\"tips\" *ngIf=\"tips\"></bd-form-tips>\n      <bd-form-counter [maxLength]=\"maxLength\" [form]=\"formControl\" *ngIf=\"maxLength && options.counterBefore\"></bd-form-counter>\n\n    </div>\n\n    <div class=\"{{ inputGroupClass }}\">\n\n      <ckeditor\n        class=\"{{ inputClass }}\"\n        [attr.id]=\"uniqueId\"\n        [attr.maxlength]=\"maxLength\"\n        [attr.aria-label]=\"placeholder\"\n        [config]=\"ckeditorConfig\"\n        (change)=\"onEditorChange($event)\"\n        ngDefaultControl>\n      </ckeditor>\n\n    </div>\n  </div>\n\n  <bd-form-errors [errors]=\"errors\" *ngIf=\"errors\"></bd-form-errors>\n  <bd-form-counter [maxLength]=\"maxLength\" [form]=\"formControl\" *ngIf=\"maxLength && !options.counterBefore\"></bd-form-counter>\n  <bd-form-help [label]=\"help\" *ngIf=\"help\"></bd-form-help>\n</div>\n"
            },] },
];
CkeditorComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
]; };
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
var ProgressButtonComponent = /** @class */ (function () {
    function ProgressButtonComponent() {
        this.btnClass = 'btn-primary';
        this.btnType = 'button';
        this.btnStateLoading = false;
        this.btnStateSuccess = false;
        this.btnDisabled = false;
    }
    return ProgressButtonComponent;
}());
ProgressButtonComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-progress-button',
                template: "<button class=\"btn btn-progress {{ btnClass }}\"\n        [attr.type]=\"btnType\"\n        [disabled]=\"btnDisabled\"\n        [ngClass]=\"{'btn-loading': btnStateLoading, 'btn-onSuccess': btnStateSuccess}\"\n>\n  <div class=\"btn-loading\">\n        <span class='loader'>\n            <span></span>\n            <span></span>\n            <span></span>\n        </span>\n  </div>\n  <div class=\"btn-text\">\n    <ng-content></ng-content>\n  </div>\n  <div class=\"btn-onSuccess\">\n    <i class=\"fa fa-check\"></i>\n  </div>\n</button>\n",
                styles: [":host .button-progress{padding:0;min-height:40px;min-width:190px;overflow:hidden;position:relative}:host .button-progress .btn-text{padding:11px 2.5px;text-align:center}:host .button-progress .btn-loading{position:relative}:host .button-progress .btn-loading .loader{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);display:inline-block;line-height:6px}:host .button-progress .btn-loading .loader span{display:inline-block;width:6px;height:6px;border-radius:50%;background:#fff;margin:0 3px;-webkit-animation:.6s infinite load;animation:.6s infinite load}:host .button-progress .btn-loading .loader span:nth-child(2){-webkit-animation-delay:.1s;animation-delay:.1s}:host .button-progress .btn-loading .loader span:nth-child(3){-webkit-animation-delay:.2s;animation-delay:.2s}:host .button-progress .btn-loading,:host .button-progress .btn-success,:host .button-progress .btn-text{display:block;-webkit-transition:opacity .1s ease-in-out,-webkit-transform .2s ease-in-out;transition:opacity .1s ease-in-out,-webkit-transform .2s ease-in-out;transition:transform .2s ease-in-out,opacity .1s ease-in-out;transition:transform .2s ease-in-out,opacity .1s ease-in-out,-webkit-transform .2s ease-in-out;position:absolute;top:0;left:0;right:0;bottom:0}:host .button-progress .btn-loading{-webkit-transform:translate(0,100%);transform:translate(0,100%);opacity:0}:host .button-progress .btn-onSuccess{-webkit-transform:translate(0,100%);transform:translate(0,100%);opacity:0}:host .button-progress.btn-loading{pointer-events:none}:host .button-progress.btn-loading .btn-text{-webkit-transform:translate(0,-100%);transform:translate(0,-100%);opacity:0}:host .button-progress.btn-loading .btn-onSuccess{-webkit-transform:translate(0,-100%);transform:translate(0,-100%);opacity:0}:host .button-progress.btn-loading .btn-loading{-webkit-transform:translate(0,0);transform:translate(0,0);opacity:1}:host .button-progress.btn-onSuccess{pointer-events:none}:host .button-progress.btn-onSuccess .btn-text{-webkit-transform:translate(0,-100%);transform:translate(0,-100%);opacity:0}:host .button-progress.btn-onSuccess .btn-loading{-webkit-transform:translate(0,-100%);transform:translate(0,-100%);opacity:0}:host .button-progress.btn-onSuccess .btn-onSuccess{-webkit-transform:translate(0,0);transform:translate(0,0);opacity:1}@-webkit-keyframes load{from,to{opacity:.6;-webkit-transform:scale(1);transform:scale(1)}30%,80%{opacity:.7;-webkit-transform:scale(1.1);transform:scale(1.1)}50%{opacity:1;-webkit-transform:scale(1.4);transform:scale(1.4)}}@keyframes load{from,to{opacity:.6;-webkit-transform:scale(1);transform:scale(1)}30%,80%{opacity:.7;-webkit-transform:scale(1.1);transform:scale(1.1)}50%{opacity:1;-webkit-transform:scale(1.4);transform:scale(1.4)}}"]
            },] },
];
ProgressButtonComponent.propDecorators = {
    "btnClass": [{ type: Input },],
    "btnType": [{ type: Input },],
    "btnStateLoading": [{ type: Input },],
    "btnStateSuccess": [{ type: Input },],
    "btnDisabled": [{ type: Input },],
};
var SelectDirective = /** @class */ (function () {
    function SelectDirective(_options, renderer, elementRef) {
        this._options = _options;
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    SelectDirective.prototype.ngOnInit = function () {
        var formGroupDiv = this.renderer.createElement('div');
        this.renderer.addClass(formGroupDiv, this._options.classFormGroup);
        if (this.label) {
            var label = this.renderer.createElement('label');
            var labelText = this.renderer.createText(this.label);
            this.renderer.addClass(label, this._options.classFormLabel);
            this.renderer.appendChild(label, labelText);
            this.renderer.appendChild(formGroupDiv, label);
        }
        this.renderer.insertBefore(this.elementRef.nativeElement.parentNode, formGroupDiv, this.elementRef.nativeElement);
        this.renderer.appendChild(formGroupDiv, this.elementRef.nativeElement);
    };
    return SelectDirective;
}());
SelectDirective.decorators = [
    { type: Directive, args: [{
                selector: '[bdSelect]'
            },] },
];
SelectDirective.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: Renderer2, },
    { type: ElementRef, },
]; };
SelectDirective.propDecorators = {
    "label": [{ type: Input },],
};
var AutosizeDirective = /** @class */ (function () {
    function AutosizeDirective(elem) {
        this.elem = elem;
    }
    AutosizeDirective.prototype.ngAfterViewInit = function () {
        this.resize();
    };
    AutosizeDirective.prototype.resize = function () {
        var textarea = (this.elem.nativeElement);
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + "px";
    };
    return AutosizeDirective;
}());
AutosizeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'textarea[autosize]',
                host: {
                    'rows': '1',
                    'style': 'overflow: hidden'
                }
            },] },
];
AutosizeDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
AutosizeDirective.propDecorators = {
    "resize": [{ type: HostListener, args: ['input',] }, { type: HostListener, args: ['load',] },],
};
var FormErrorInterceptor = /** @class */ (function () {
    function FormErrorInterceptor(formErrorService) {
        this.formErrorService = formErrorService;
    }
    FormErrorInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return next.handle(req).do(function () {
        }, function (err) {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 400) {
                    var errorObject_1 = err.error;
                    if (errorObject_1.errors && errorObject_1.errors.children) {
                        var objectKeys = Object.keys(errorObject_1.errors.children);
                        objectKeys.forEach(function (key) {
                            var property = errorObject_1.errors.children[key];
                            if (property.errors && property.errors.length > 0) {
                                property.errors.forEach(function (message) {
                                    _this.formErrorService.propertyError.next({ property_path: key, message: message });
                                });
                            }
                        });
                    }
                }
            }
        });
    };
    return FormErrorInterceptor;
}());
FormErrorInterceptor.decorators = [
    { type: Injectable },
];
FormErrorInterceptor.ctorParameters = function () { return [
    { type: FormErrorService, },
]; };
var CheckboxComponent = /** @class */ (function (_super) {
    __extends(CheckboxComponent, _super);
    function CheckboxComponent(_options, formErrorService) {
        var _this = _super.call(this, _options) || this;
        _this._options = _options;
        _this.formErrorService = formErrorService;
        _this.placeholder = '';
        _this.disableErrors = false;
        _this.disabled = false;
        _this.onChange = new EventEmitter();
        _this.isChecked = false;
        _this.onTouchedCallback = noop;
        _this.onChangeCallback = noop;
        return _this;
    }
    Object.defineProperty(CheckboxComponent.prototype, "value", {
        get: function () {
            return this.isChecked;
        },
        set: function (value) {
            this.isChecked = value;
        },
        enumerable: true,
        configurable: true
    });
    CheckboxComponent.prototype.writeValue = function (value) {
        if (value !== this.isChecked) {
            this.isChecked = value;
        }
    };
    CheckboxComponent.prototype.onInputChange = function (isChecked) {
        this.value = isChecked;
        this.onChange.emit(this.isChecked);
        this.onChangeCallback(this.value);
    };
    CheckboxComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    CheckboxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    CheckboxComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    return CheckboxComponent;
}(FormInputComponent));
CheckboxComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return CheckboxComponent; }),
                        multi: true
                    }],
                selector: 'bd-checkbox',
                template: "<div class=\"{{ options.classFormGroup }}\" [ngClass]=\"{'has-errors': errors.length}\">\n\n\n\n</div>\n\n<div class=\"{{ options.classFormGroup }}\">\n\n  <div class=\"{{ options.classFromInput }}\">\n\n    <div class=\"{{ options.classFromLegend }}\">\n\n      <bd-form-label [label]=\"label\" [inputId]=\"uniqueId\"></bd-form-label>\n      <bd-form-required [required]=\"requiredMarker\" *ngIf=\"requiredMarker\"></bd-form-required>\n      <bd-form-tips [tips]=\"tips\" *ngIf=\"tips\"></bd-form-tips>\n\n    </div>\n\n    <div class=\"{{ inputGroupClass }}\">\n\n      <div class=\"checkbox\">\n        <label>\n          <input [disabled]=\"disabled\" type=\"checkbox\"  [(ngModel)]=\"isChecked\" #inputEl\n                 (change)=\"onInputChange(inputEl.checked)\"\n                 ngDefaultControl /> <span *ngIf=\"label\">{{ label }}</span>\n        </label>\n      </div>\n\n    </div>\n  </div>\n\n  <bd-form-errors [errors]=\"errors\" *ngIf=\"errors\"></bd-form-errors>\n  <bd-form-help [label]=\"help\" *ngIf=\"help\"></bd-form-help>\n</div>\n\n"
            },] },
];
CheckboxComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
]; };
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
var DatetimepickerComponent = /** @class */ (function (_super) {
    __extends(DatetimepickerComponent, _super);
    function DatetimepickerComponent(_options, formErrorService, langService) {
        var _this = _super.call(this, _options) || this;
        _this._options = _options;
        _this.formErrorService = formErrorService;
        _this.langService = langService;
        _this.placeholder = '';
        _this.disableErrors = false;
        _this.bsConfig = new BsDatepickerConfig();
        _this.bsLang = 'en';
        _this.bsMaxDate = null;
        _this.bsMinDate = null;
        _this.isMeridian = false;
        return _this;
    }
    DatetimepickerComponent.prototype.writeValue = function (value) {
        if (!value) {
            this.dateTime = { date: null, time: new Date() };
        }
        else {
            this.dateTime = { date: new Date(value), time: new Date(value) };
        }
    };
    DatetimepickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DatetimepickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    DatetimepickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.isDisabled = isDisabled;
    };
    DatetimepickerComponent.prototype.onDateChange = function (date) {
        this.onChange(this.dateTime.date.toISOString());
    };
    DatetimepickerComponent.prototype.onTimeChange = function (date) {
        if (this.dateTime.date) {
            this.dateTime.date.setHours(this.dateTime.time.getHours());
            this.dateTime.date.setMinutes(this.dateTime.time.getMinutes());
            this.dateTime.date.setSeconds(this.dateTime.time.getSeconds());
            this.onChange(this.dateTime.date.toISOString());
        }
    };
    DatetimepickerComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.langService.use(this.bsLang);
        if (this.disabled) {
            this.formControl.disable();
        }
    };
    return DatetimepickerComponent;
}(FormInputComponent));
DatetimepickerComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return DatetimepickerComponent; }),
                        multi: true
                    }],
                selector: 'bd-datetimepicker',
                template: "<div class=\"{{ options.classFormGroup }}\" [ngClass]=\"{'has-errors': errors.length}\">\n  <bd-form-label [label]=\"label\"></bd-form-label>\n\n  <div class=\"row\">\n    <div class=\"col-md-6 col-sm-12\">\n      <input #dp\n             type=\"text\"\n             class=\"{{ options.classFormControl }} {{ inputClass }}\"\n             bsDatepicker\n             [bsConfig]=\"bsConfig\"\n             [placeholder]=\"placeholder\"\n             [disabled]=\"disabled\"\n             [minDate]=\"bsMinDate\"\n             [maxDate]=\"bsMaxDate\"\n             [bsValue]=\"dateTime.date\"\n             [(ngModel)]=\"dateTime.date\"\n             [disabled]=\"isDisabled\"\n             (ngModelChange)=\"onDateChange($event)\"\n      />\n    </div>\n    <div class=\"col-md-6 col-sm-12\">\n      <timepicker\n              [(ngModel)]=\"dateTime.time\"\n              (ngModelChange)=\"onTimeChange($event)\"\n              [showMeridian]=\"isMeridian\"\n              [disabled]=\"disabled\"\n              [readonlyInput]=\"isDisabled\"\n      ></timepicker>\n    </div>\n  </div>\n\n  <bd-form-errors [errors]=\"errors\"></bd-form-errors>\n  <bd-form-help [label]=\"help\"></bd-form-help>\n\n</div>\n",
                styles: [":host timepicker{margin-top:-18px;display:block}:host ::ng-deep timepicker .btn{min-width:0;padding:0}"]
            },] },
];
DatetimepickerComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
    { type: BsLocaleService, },
]; };
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
var FormLabelComponent = /** @class */ (function () {
    function FormLabelComponent(_options) {
        this._options = _options;
    }
    Object.defineProperty(FormLabelComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    return FormLabelComponent;
}());
FormLabelComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-label',
                template: "<label class=\"{{ options.classFormLabel }}\" for=\"{{ inputId }}\" *ngIf=\"label\">{{ label }}</label>\n"
            },] },
];
FormLabelComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
]; };
FormLabelComponent.propDecorators = {
    "label": [{ type: Input },],
    "inputId": [{ type: Input },],
};
var FormErrorsComponent = /** @class */ (function () {
    function FormErrorsComponent(_options) {
        this._options = _options;
    }
    Object.defineProperty(FormErrorsComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    return FormErrorsComponent;
}());
FormErrorsComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-errors',
                template: "<ul class=\"{{ options.classFormError }}\" *ngIf=\"errors.length\">\n  <li *ngFor=\"let error of errors\">\n    {{ error | translate }}\n  </li>\n</ul>\n\n\n"
            },] },
];
FormErrorsComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
]; };
FormErrorsComponent.propDecorators = {
    "errors": [{ type: Input },],
};
var FormHelpComponent = /** @class */ (function () {
    function FormHelpComponent(_options) {
        this._options = _options;
    }
    Object.defineProperty(FormHelpComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    return FormHelpComponent;
}());
FormHelpComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-help',
                template: "<div class=\"{{ options.classFormHelp }}\" *ngIf=\"label\">\n  {{ label | translate }}\n</div>\n"
            },] },
];
FormHelpComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
]; };
FormHelpComponent.propDecorators = {
    "label": [{ type: Input },],
};
var RteComponent = /** @class */ (function (_super) {
    __extends(RteComponent, _super);
    function RteComponent(_options, formErrorService) {
        var _this = _super.call(this, _options) || this;
        _this._options = _options;
        _this.formErrorService = formErrorService;
        _this.rteConfig = {
            toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['clean'],
                ['link']
            ]
        };
        _this.placeholder = '';
        _this.disableErrors = false;
        return _this;
    }
    RteComponent.prototype.writeValue = function (writeValue) {
    };
    RteComponent.prototype.registerOnChange = function (fn) {
    };
    RteComponent.prototype.registerOnTouched = function (fn) {
    };
    RteComponent.prototype.setDisabledState = function (isDisabled) {
    };
    return RteComponent;
}(FormInputComponent));
RteComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return RteComponent; }),
                        multi: true
                    }],
                selector: 'bd-rte',
                template: "<div class=\"{{ options.classFormGroup }}\" [ngClass]=\"{'has-errors': errors.length}\">\n\n  <div class=\"{{ options.classFromInput }}\">\n\n    <div class=\"{{ options.classFromLegend }}\">\n\n      <bd-form-label [label]=\"label\" [inputId]=\"uniqueId\"></bd-form-label>\n      <bd-form-required [required]=\"requiredMarker\" *ngIf=\"requiredMarker\"></bd-form-required>\n      <bd-form-tips [tips]=\"tips\" *ngIf=\"tips\"></bd-form-tips>\n      <bd-form-counter [maxLength]=\"maxLength\" [form]=\"formControl\" *ngIf=\"maxLength && options.counterBefore\"></bd-form-counter>\n\n    </div>\n\n    <div class=\"{{ inputGroupClass }}\">\n\n      <quill-editor #editor [formControl]=\"formControl\" [modules]=\"rteConfig\"></quill-editor>\n\n    </div>\n  </div>\n\n  <bd-form-errors [errors]=\"errors\" *ngIf=\"errors\"></bd-form-errors>\n  <bd-form-counter [maxLength]=\"maxLength\" [form]=\"formControl\" *ngIf=\"maxLength && !options.counterBefore\"></bd-form-counter>\n  <bd-form-help [label]=\"help\" *ngIf=\"help\"></bd-form-help>\n</div>\n"
            },] },
];
RteComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: FormErrorService, },
]; };
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
var FormTipsComponent = /** @class */ (function () {
    function FormTipsComponent(_options) {
        this._options = _options;
    }
    Object.defineProperty(FormTipsComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    return FormTipsComponent;
}());
FormTipsComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-tips',
                template: "<ng-container *ngIf=\"tips && tips.length\">\n  <span *ngFor=\"let tip of tips\">\n    <i class=\"fas {{ tip.icon }}\" popover=\"{{ tip.tooltip|translate }}\"></i>\n  </span>\n</ng-container>\n"
            },] },
];
FormTipsComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
]; };
FormTipsComponent.propDecorators = {
    "tips": [{ type: Input },],
};
var FormRequiredComponent = /** @class */ (function () {
    function FormRequiredComponent(_options, _sanitizer) {
        this._options = _options;
        this._sanitizer = _sanitizer;
    }
    Object.defineProperty(FormRequiredComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormRequiredComponent.prototype, "requiredString", {
        get: function () {
            return this._sanitizer.bypassSecurityTrustHtml(this.options.requiredString);
        },
        enumerable: true,
        configurable: true
    });
    return FormRequiredComponent;
}());
FormRequiredComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-required',
                template: "<span class=\"{{ options.classFormRequired }}\" *ngIf=\"required\" [innerHTML]=\"requiredString\"></span>\n"
            },] },
];
FormRequiredComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: DomSanitizer, },
]; };
FormRequiredComponent.propDecorators = {
    "required": [{ type: Input },],
};
var MaxLengthDirective = /** @class */ (function () {
    function MaxLengthDirective(_options, renderer, elementRef) {
        this._options = _options;
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    MaxLengthDirective.prototype.ngAfterViewInit = function () {
        this.counter();
    };
    MaxLengthDirective.prototype.counter = function () {
        var counterDiv = this.renderer.createElement('div');
        this.renderer.addClass(counterDiv, this._options.classFormGroup);
        this.renderer.insertBefore(this.elementRef.nativeElement.parentNode, counterDiv, this.elementRef.nativeElement);
        this.renderer.appendChild(counterDiv, this.elementRef.nativeElement);
    };
    return MaxLengthDirective;
}());
MaxLengthDirective.decorators = [
    { type: Directive, args: [{
                selector: '[bd-maxlength]'
            },] },
];
MaxLengthDirective.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: Renderer2, },
    { type: ElementRef, },
]; };
MaxLengthDirective.propDecorators = {
    "counter": [{ type: HostListener, args: ['input',] }, { type: HostListener, args: ['load',] },],
};
var FormCounterComponent = /** @class */ (function () {
    function FormCounterComponent(_options) {
        this._options = _options;
    }
    Object.defineProperty(FormCounterComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    FormCounterComponent.prototype.getMaxLenghtLabel = function () {
        var length = this.maxLength - this.form.value.length;
        return this._options.maxLengthString.replace('%s', length.toString());
    };
    return FormCounterComponent;
}());
FormCounterComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-counter',
                template: "<span class=\"{{ options.classFormCounter }}\">\n  {{ getMaxLenghtLabel() }}\n</span>\n"
            },] },
];
FormCounterComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
]; };
FormCounterComponent.propDecorators = {
    "maxLength": [{ type: Input },],
    "form": [{ type: Input },],
};
var FormAddonComponent = /** @class */ (function () {
    function FormAddonComponent(_options, _sanitizer) {
        this._options = _options;
        this._sanitizer = _sanitizer;
    }
    Object.defineProperty(FormAddonComponent.prototype, "hostClasses", {
        get: function () {
            return this.position === 'prepend' ? this.options.classFormInputGroupPrepend : this.options.classFormInputGroupAppend;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAddonComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAddonComponent.prototype, "addonString", {
        get: function () {
            return this._sanitizer.bypassSecurityTrustHtml(this.text);
        },
        enumerable: true,
        configurable: true
    });
    return FormAddonComponent;
}());
FormAddonComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-addon',
                template: "<span class=\"{{ options.classFormInputGroupText }}\" [innerHTML]=\"addonString\"></span>\n",
            },] },
];
FormAddonComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: DomSanitizer, },
]; };
FormAddonComponent.propDecorators = {
    "text": [{ type: Input },],
    "position": [{ type: Input },],
    "hostClasses": [{ type: HostBinding, args: ['class',] },],
};
var DefaultFormUtilitiesOptions = {
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
var FormUtilitiesModule = /** @class */ (function () {
    function FormUtilitiesModule() {
    }
    FormUtilitiesModule.forRoot = function (options) {
        if (options === void 0) { options = { displayErrors: true }; }
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
    };
    return FormUtilitiesModule;
}());
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
var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var isEmail = function (c) {
    return EMAIL_REGEX.test(c.value) ? null : { email: true };
};

export { InputComponent, DatepickerComponent, DaterangeComponent, TextareaComponent, CkeditorComponent, ProgressButtonComponent, SelectDirective, AutosizeDirective, FormErrorService, FormUtilitiesModule, DefaultFormUtilitiesOptions, isEmail, CheckboxComponent as ɵd, DatetimepickerComponent as ɵe, FormInputComponent as ɵb, RteComponent as ɵc, FormAddonComponent as ɵm, FormCounterComponent as ɵl, FormErrorsComponent as ɵh, FormHelpComponent as ɵi, FormLabelComponent as ɵg, FormRequiredComponent as ɵk, FormTipsComponent as ɵj, MaxLengthDirective as ɵf, FormErrorInterceptor as ɵn };
//# sourceMappingURL=braune-digital-form-utilities.js.map
