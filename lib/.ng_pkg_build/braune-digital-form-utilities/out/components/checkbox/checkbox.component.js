/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FormInputComponent } from '../form-input.component';
import { CheckboxControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, EventEmitter, forwardRef, Inject, Input, Output, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { noop } from 'rxjs/util/noop';
export class CheckboxComponent extends FormInputComponent {
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
function CheckboxComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CheckboxComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CheckboxComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CheckboxComponent.propDecorators;
    /** @type {?} */
    CheckboxComponent.prototype.input;
    /** @type {?} */
    CheckboxComponent.prototype.label;
    /** @type {?} */
    CheckboxComponent.prototype.placeholder;
    /** @type {?} */
    CheckboxComponent.prototype.inputClass;
    /** @type {?} */
    CheckboxComponent.prototype.disableErrors;
    /** @type {?} */
    CheckboxComponent.prototype.disabled;
    /** @type {?} */
    CheckboxComponent.prototype.formControl;
    /** @type {?} */
    CheckboxComponent.prototype.onChange;
    /** @type {?} */
    CheckboxComponent.prototype.isChecked;
    /** @type {?} */
    CheckboxComponent.prototype.onTouchedCallback;
    /** @type {?} */
    CheckboxComponent.prototype.onChangeCallback;
    /** @type {?} */
    CheckboxComponent.prototype._options;
    /** @type {?} */
    CheckboxComponent.prototype.formErrorService;
}
//# sourceMappingURL=checkbox.component.js.map