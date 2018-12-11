/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject, Input } from '@angular/core';
export class FormLabelComponent {
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
function FormLabelComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormLabelComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormLabelComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FormLabelComponent.propDecorators;
    /** @type {?} */
    FormLabelComponent.prototype.label;
    /** @type {?} */
    FormLabelComponent.prototype.inputId;
    /** @type {?} */
    FormLabelComponent.prototype._options;
}
//# sourceMappingURL=form-label.component.js.map