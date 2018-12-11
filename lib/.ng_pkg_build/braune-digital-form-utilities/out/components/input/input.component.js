/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FormInputComponent } from '../form-input.component';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, EventEmitter, forwardRef, Inject, Input, Output, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
export class InputComponent extends FormInputComponent {
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
function InputComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    InputComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    InputComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    InputComponent.propDecorators;
    /** @type {?} */
    InputComponent.prototype.input;
    /** @type {?} */
    InputComponent.prototype.label;
    /** @type {?} */
    InputComponent.prototype.inputClass;
    /** @type {?} */
    InputComponent.prototype.placeholder;
    /** @type {?} */
    InputComponent.prototype.type;
    /** @type {?} */
    InputComponent.prototype.step;
    /** @type {?} */
    InputComponent.prototype.disableErrors;
    /** @type {?} */
    InputComponent.prototype.formControl;
    /** @type {?} */
    InputComponent.prototype.onInputKeypress;
    /** @type {?} */
    InputComponent.prototype.onInputChange;
    /** @type {?} */
    InputComponent.prototype.onInputKeyup;
    /** @type {?} */
    InputComponent.prototype.onFocus;
    /** @type {?} */
    InputComponent.prototype.onFocusOut;
    /** @type {?} */
    InputComponent.prototype._options;
    /** @type {?} */
    InputComponent.prototype.formErrorService;
}
//# sourceMappingURL=input.component.js.map