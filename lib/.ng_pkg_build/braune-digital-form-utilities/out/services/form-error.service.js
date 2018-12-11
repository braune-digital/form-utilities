/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export class FormErrorService {
    constructor() {
        this.propertyError = new Subject();
        this.formError = new Subject();
    }
}
FormErrorService.decorators = [
    { type: Injectable },
];
function FormErrorService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormErrorService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormErrorService.ctorParameters;
    /** @type {?} */
    FormErrorService.prototype.propertyError;
    /** @type {?} */
    FormErrorService.prototype.formError;
}
//# sourceMappingURL=form-error.service.js.map