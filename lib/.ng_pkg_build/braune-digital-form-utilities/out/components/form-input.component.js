/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Inject, Input } from '@angular/core';
/**
 * @abstract
 */
export class FormInputComponent {
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
        let /** @type {?} */ errors = [];
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
function FormInputComponent_tsickle_Closure_declarations() {
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormInputComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FormInputComponent.propDecorators;
    /** @type {?} */
    FormInputComponent.REMOTE_ERROR_PREFIX;
    /** @type {?} */
    FormInputComponent.ERROR_PREFIX;
    /** @type {?} */
    FormInputComponent.prototype.input;
    /** @type {?} */
    FormInputComponent.prototype.formErrorService;
    /** @type {?} */
    FormInputComponent.prototype.label;
    /** @type {?} */
    FormInputComponent.prototype.placeholder;
    /** @type {?} */
    FormInputComponent.prototype.formControl;
    /** @type {?} */
    FormInputComponent.prototype.formErrorServiceSubscription;
    /** @type {?} */
    FormInputComponent.prototype.displayErrors;
    /** @type {?} */
    FormInputComponent.prototype.requiredMarker;
    /** @type {?} */
    FormInputComponent.prototype.tips;
    /** @type {?} */
    FormInputComponent.prototype.help;
    /** @type {?} */
    FormInputComponent.prototype.maxLength;
    /** @type {?} */
    FormInputComponent.prototype.append;
    /** @type {?} */
    FormInputComponent.prototype.prepend;
    /** @type {?} */
    FormInputComponent.prototype.disabled;
    /** @type {?} */
    FormInputComponent.prototype.uniqueId;
    /** @type {?} */
    FormInputComponent.prototype._focus;
    /** @type {?} */
    FormInputComponent.prototype._options;
}
//# sourceMappingURL=form-input.component.js.map