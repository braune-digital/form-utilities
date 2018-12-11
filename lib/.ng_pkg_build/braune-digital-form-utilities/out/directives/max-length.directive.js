/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostListener, Inject, Renderer2 } from '@angular/core';
export class MaxLengthDirective {
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
    ngAfterViewInit() {
        this.counter();
    }
    /**
     * @return {?}
     */
    counter() {
        const /** @type {?} */ counterDiv = this.renderer.createElement('div');
        this.renderer.addClass(counterDiv, this._options.classFormGroup);
        this.renderer.insertBefore(this.elementRef.nativeElement.parentNode, counterDiv, this.elementRef.nativeElement);
        this.renderer.appendChild(counterDiv, this.elementRef.nativeElement);
    }
}
MaxLengthDirective.decorators = [
    { type: Directive, args: [{
                selector: '[bd-maxlength]'
            },] },
];
/** @nocollapse */
MaxLengthDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    { type: Renderer2, },
    { type: ElementRef, },
];
MaxLengthDirective.propDecorators = {
    "counter": [{ type: HostListener, args: ['input',] }, { type: HostListener, args: ['load',] },],
};
function MaxLengthDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MaxLengthDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MaxLengthDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MaxLengthDirective.propDecorators;
    /** @type {?} */
    MaxLengthDirective.prototype._options;
    /** @type {?} */
    MaxLengthDirective.prototype.renderer;
    /** @type {?} */
    MaxLengthDirective.prototype.elementRef;
}
//# sourceMappingURL=max-length.directive.js.map