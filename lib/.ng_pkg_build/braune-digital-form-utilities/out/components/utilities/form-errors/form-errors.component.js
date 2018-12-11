/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject, Input } from '@angular/core';
export class FormErrorsComponent {
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
FormErrorsComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-errors',
                template: `<ul class="{{ options.classFormError }}" *ngIf="errors.length">
  <li *ngFor="let error of errors">
    {{ error | translate }}
  </li>
</ul>


`
            },] },
];
/** @nocollapse */
FormErrorsComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
];
FormErrorsComponent.propDecorators = {
    "errors": [{ type: Input },],
};
function FormErrorsComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormErrorsComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormErrorsComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FormErrorsComponent.propDecorators;
    /** @type {?} */
    FormErrorsComponent.prototype.errors;
    /** @type {?} */
    FormErrorsComponent.prototype._options;
}
//# sourceMappingURL=form-errors.component.js.map