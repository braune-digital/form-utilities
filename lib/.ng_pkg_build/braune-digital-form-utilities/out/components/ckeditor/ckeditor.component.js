/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FormInputComponent } from '../form-input.component';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Inject, Input, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { CKEditorComponent } from 'ng2-ckeditor';
export class CkeditorComponent extends FormInputComponent {
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
function CkeditorComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CkeditorComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CkeditorComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CkeditorComponent.propDecorators;
    /** @type {?} */
    CkeditorComponent.prototype.input;
    /** @type {?} */
    CkeditorComponent.prototype.editor;
    /** @type {?} */
    CkeditorComponent.prototype.ckeditorConfig;
    /** @type {?} */
    CkeditorComponent.prototype.inputClass;
    /** @type {?} */
    CkeditorComponent.prototype.label;
    /** @type {?} */
    CkeditorComponent.prototype.placeholder;
    /** @type {?} */
    CkeditorComponent.prototype.disableErrors;
    /** @type {?} */
    CkeditorComponent.prototype.formControl;
    /** @type {?} */
    CkeditorComponent.prototype.onChange;
    /** @type {?} */
    CkeditorComponent.prototype.onTouched;
    /** @type {?} */
    CkeditorComponent.prototype._options;
    /** @type {?} */
    CkeditorComponent.prototype.formErrorService;
}
//# sourceMappingURL=ckeditor.component.js.map