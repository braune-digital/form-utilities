/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FormInputComponent } from '../form-input.component';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Inject, Input, ViewChild } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { CKEditorComponent } from 'ng2-ckeditor';
export class RteComponent extends FormInputComponent {
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
function RteComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    RteComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    RteComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    RteComponent.propDecorators;
    /** @type {?} */
    RteComponent.prototype.input;
    /** @type {?} */
    RteComponent.prototype.editor;
    /** @type {?} */
    RteComponent.prototype.rteConfig;
    /** @type {?} */
    RteComponent.prototype.label;
    /** @type {?} */
    RteComponent.prototype.help;
    /** @type {?} */
    RteComponent.prototype.inputClass;
    /** @type {?} */
    RteComponent.prototype.placeholder;
    /** @type {?} */
    RteComponent.prototype.disableErrors;
    /** @type {?} */
    RteComponent.prototype.formControl;
    /** @type {?} */
    RteComponent.prototype.onChange;
    /** @type {?} */
    RteComponent.prototype.onTouched;
    /** @type {?} */
    RteComponent.prototype._options;
    /** @type {?} */
    RteComponent.prototype.formErrorService;
}
//# sourceMappingURL=rte.component.js.map