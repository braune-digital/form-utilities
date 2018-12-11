/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { FormErrorService } from '../services/form-error.service';
export class FormErrorInterceptor {
    /**
     * @param {?} formErrorService
     */
    constructor(formErrorService) {
        this.formErrorService = formErrorService;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        return next.handle(req).do(() => {
        }, (err) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 400) {
                    const /** @type {?} */ errorObject = err.error;
                    if (errorObject.errors && errorObject.errors.children) {
                        const /** @type {?} */ objectKeys = Object.keys(errorObject.errors.children);
                        objectKeys.forEach((key) => {
                            const /** @type {?} */ property = errorObject.errors.children[key];
                            if (property.errors && property.errors.length > 0) {
                                property.errors.forEach((message) => {
                                    this.formErrorService.propertyError.next({ property_path: key, message: message });
                                });
                            }
                        });
                    }
                }
            }
        });
    }
}
FormErrorInterceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FormErrorInterceptor.ctorParameters = () => [
    { type: FormErrorService, },
];
function FormErrorInterceptor_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormErrorInterceptor.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormErrorInterceptor.ctorParameters;
    /** @type {?} */
    FormErrorInterceptor.prototype.formErrorService;
}
//# sourceMappingURL=form-error.interceptor.js.map