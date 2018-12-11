/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FormInputComponent } from '../form-input.component';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Inject, Input, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { BsDatepickerConfig, BsDaterangepickerDirective, BsLocaleService } from 'ngx-bootstrap';
export class DaterangeComponent extends FormInputComponent {
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
function DaterangeComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DaterangeComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DaterangeComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DaterangeComponent.propDecorators;
    /** @type {?} */
    DaterangeComponent.prototype.input;
    /** @type {?} */
    DaterangeComponent.prototype.label;
    /** @type {?} */
    DaterangeComponent.prototype.help;
    /** @type {?} */
    DaterangeComponent.prototype.inputClass;
    /** @type {?} */
    DaterangeComponent.prototype.placeholder;
    /** @type {?} */
    DaterangeComponent.prototype.disableErrors;
    /** @type {?} */
    DaterangeComponent.prototype.formControl;
    /** @type {?} */
    DaterangeComponent.prototype.bsConfig;
    /** @type {?} */
    DaterangeComponent.prototype.bsLang;
    /** @type {?} */
    DaterangeComponent.prototype.bsMaxDate;
    /** @type {?} */
    DaterangeComponent.prototype.bsMinDate;
    /** @type {?} */
    DaterangeComponent.prototype.daterange;
    /** @type {?} */
    DaterangeComponent.prototype._options;
    /** @type {?} */
    DaterangeComponent.prototype.formErrorService;
    /** @type {?} */
    DaterangeComponent.prototype.langService;
}
//# sourceMappingURL=daterange.component.js.map