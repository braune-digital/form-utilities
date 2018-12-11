/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
export class SelectDirective {
    /**
     * @param {?} _options
     * @param {?} renderer
     * @param {?} elementRef
     */
    constructor(_options, renderer, elementRef) {
        this._options = _options;
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Create a div with form-group
        const /** @type {?} */ formGroupDiv = this.renderer.createElement('div');
        this.renderer.addClass(formGroupDiv, this._options.classFormGroup);
        if (this.label) {
            const /** @type {?} */ label = this.renderer.createElement('label');
            const /** @type {?} */ labelText = this.renderer.createText(this.label);
            this.renderer.addClass(label, this._options.classFormLabel);
            this.renderer.appendChild(label, labelText);
            this.renderer.appendChild(formGroupDiv, label);
        }
        this.renderer.insertBefore(this.elementRef.nativeElement.parentNode, formGroupDiv, this.elementRef.nativeElement);
        this.renderer.appendChild(formGroupDiv, this.elementRef.nativeElement);
    }
}
SelectDirective.decorators = [
    { type: Directive, args: [{
                selector: '[bdSelect]'
            },] },
];
/** @nocollapse */
SelectDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: Renderer2, },
    { type: ElementRef, },
];
SelectDirective.propDecorators = {
    "label": [{ type: Input },],
};
function SelectDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SelectDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SelectDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SelectDirective.propDecorators;
    /** @type {?} */
    SelectDirective.prototype.label;
    /** @type {?} */
    SelectDirective.prototype._options;
    /** @type {?} */
    SelectDirective.prototype.renderer;
    /** @type {?} */
    SelectDirective.prototype.elementRef;
}
//# sourceMappingURL=select.directive.js.map