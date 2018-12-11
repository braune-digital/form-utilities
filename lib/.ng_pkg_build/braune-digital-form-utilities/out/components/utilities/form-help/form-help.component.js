/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject, Input } from '@angular/core';
export class FormHelpComponent {
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
FormHelpComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-help',
                template: `<div class="{{ options.classFormHelp }}" *ngIf="label">
  {{ label | translate }}
</div>
`
            },] },
];
/** @nocollapse */
FormHelpComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
];
FormHelpComponent.propDecorators = {
    "label": [{ type: Input },],
};
function FormHelpComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormHelpComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormHelpComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FormHelpComponent.propDecorators;
    /** @type {?} */
    FormHelpComponent.prototype.label;
    /** @type {?} */
    FormHelpComponent.prototype._options;
}
//# sourceMappingURL=form-help.component.js.map