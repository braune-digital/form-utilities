/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostBinding, Inject, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class FormAddonComponent {
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
    get hostClasses() {
        return this.position === 'prepend' ? this.options.classFormInputGroupPrepend : this.options.classFormInputGroupAppend;
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
    get addonString() {
        return this._sanitizer.bypassSecurityTrustHtml(this.text);
    }
}
FormAddonComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-form-addon',
                template: `<span class="{{ options.classFormInputGroupText }}" [innerHTML]="addonString"></span>
`,
            },] },
];
/** @nocollapse */
FormAddonComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: DomSanitizer, },
];
FormAddonComponent.propDecorators = {
    "text": [{ type: Input },],
    "position": [{ type: Input },],
    "hostClasses": [{ type: HostBinding, args: ['class',] },],
};
function FormAddonComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormAddonComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormAddonComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FormAddonComponent.propDecorators;
    /** @type {?} */
    FormAddonComponent.prototype.text;
    /** @type {?} */
    FormAddonComponent.prototype.position;
    /** @type {?} */
    FormAddonComponent.prototype._options;
    /** @type {?} */
    FormAddonComponent.prototype._sanitizer;
}
//# sourceMappingURL=form-addon.component.js.map