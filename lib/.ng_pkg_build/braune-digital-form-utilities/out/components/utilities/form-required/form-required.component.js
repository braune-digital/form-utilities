/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class FormRequiredComponent {
    /**
     * @param {?} _options
     * @param {?} _sanitizer
     */
    constructor(_options, _sanitizer) {
        this._options = _options;
        this._sanitizer = _sanitizer;
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
    get requiredString() {
        return this._sanitizer.bypassSecurityTrustHtml(this.options.requiredString);
    }
}
FormRequiredComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-required',
                template: `<span class="{{ options.classFormRequired }}" *ngIf="required" [innerHTML]="requiredString"></span>
`
            },] },
];
/** @nocollapse */
FormRequiredComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: DomSanitizer, },
];
FormRequiredComponent.propDecorators = {
    "required": [{ type: Input },],
};
function FormRequiredComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormRequiredComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormRequiredComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FormRequiredComponent.propDecorators;
    /** @type {?} */
    FormRequiredComponent.prototype.required;
    /** @type {?} */
    FormRequiredComponent.prototype._options;
    /** @type {?} */
    FormRequiredComponent.prototype._sanitizer;
}
//# sourceMappingURL=form-required.component.js.map