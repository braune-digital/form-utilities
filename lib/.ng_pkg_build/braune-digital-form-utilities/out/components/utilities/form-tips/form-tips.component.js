/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject, Input } from '@angular/core';
export class FormTipsComponent {
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
FormTipsComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-tips',
                template: `<ng-container *ngIf="tips && tips.length">
  <span *ngFor="let tip of tips">
    <i class="fas {{ tip.icon }}" popover="{{ tip.tooltip|translate }}"></i>
  </span>
</ng-container>
`
            },] },
];
/** @nocollapse */
FormTipsComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
];
FormTipsComponent.propDecorators = {
    "tips": [{ type: Input },],
};
function FormTipsComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormTipsComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormTipsComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FormTipsComponent.propDecorators;
    /** @type {?} */
    FormTipsComponent.prototype.tips;
    /** @type {?} */
    FormTipsComponent.prototype._options;
}
//# sourceMappingURL=form-tips.component.js.map