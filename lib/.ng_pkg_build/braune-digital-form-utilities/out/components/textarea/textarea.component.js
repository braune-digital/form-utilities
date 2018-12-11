/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FormInputComponent } from '../form-input.component';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Inject, Input, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
export class TextareaComponent extends FormInputComponent {
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
function TextareaComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TextareaComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TextareaComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TextareaComponent.propDecorators;
    /** @type {?} */
    TextareaComponent.prototype.input;
    /** @type {?} */
    TextareaComponent.prototype.label;
    /** @type {?} */
    TextareaComponent.prototype.help;
    /** @type {?} */
    TextareaComponent.prototype.inputClass;
    /** @type {?} */
    TextareaComponent.prototype.placeholder;
    /** @type {?} */
    TextareaComponent.prototype.disableErrors;
    /** @type {?} */
    TextareaComponent.prototype.formControl;
    /** @type {?} */
    TextareaComponent.prototype._options;
    /** @type {?} */
    TextareaComponent.prototype.formErrorService;
}
//# sourceMappingURL=textarea.component.js.map