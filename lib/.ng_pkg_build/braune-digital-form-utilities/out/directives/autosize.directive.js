/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostListener } from '@angular/core';
export class AutosizeDirective {
    /**
     * @param {?} elem
     */
    constructor(elem) {
        this.elem = elem;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.resize();
    }
    /**
     * @return {?}
     */
    resize() {
        const /** @type {?} */ textarea = /** @type {?} */ (this.elem.nativeElement);
        // Reset textarea height to auto that correctly calculate the new height
        textarea.style.height = 'auto';
        // Set new height
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
}
AutosizeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'textarea[autosize]',
                host: {
                    'rows': '1',
                    'style': 'overflow: hidden'
                }
            },] },
];
/** @nocollapse */
AutosizeDirective.ctorParameters = () => [
    { type: ElementRef, },
];
AutosizeDirective.propDecorators = {
    "resize": [{ type: HostListener, args: ['input',] }, { type: HostListener, args: ['load',] },],
};
function AutosizeDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AutosizeDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AutosizeDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    AutosizeDirective.propDecorators;
    /** @type {?} */
    AutosizeDirective.prototype.elem;
}
//# sourceMappingURL=autosize.directive.js.map