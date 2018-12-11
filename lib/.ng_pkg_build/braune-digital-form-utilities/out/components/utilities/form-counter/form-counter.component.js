/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
export class FormCounterComponent {
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
function FormCounterComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormCounterComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormCounterComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FormCounterComponent.propDecorators;
    /** @type {?} */
    FormCounterComponent.prototype.maxLength;
    /** @type {?} */
    FormCounterComponent.prototype.form;
    /** @type {?} */
    FormCounterComponent.prototype._options;
}
//# sourceMappingURL=form-counter.component.js.map