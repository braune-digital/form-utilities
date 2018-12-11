/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class ProgressButtonComponent {
    constructor() {
        this.btnClass = 'btn-primary';
        this.btnType = 'button';
        this.btnStateLoading = false;
        this.btnStateSuccess = false;
        this.btnDisabled = false;
    }
}
ProgressButtonComponent.decorators = [
    { type: Component, args: [{
                moduleId: module.id,
                selector: 'bd-progress-button',
                template: `<button class="btn btn-progress {{ btnClass }}"
        [attr.type]="btnType"
        [disabled]="btnDisabled"
        [ngClass]="{'btn-loading': btnStateLoading, 'btn-onSuccess': btnStateSuccess}"
>
  <div class="btn-loading">
        <span class='loader'>
            <span></span>
            <span></span>
            <span></span>
        </span>
  </div>
  <div class="btn-text">
    <ng-content></ng-content>
  </div>
  <div class="btn-onSuccess">
    <i class="fa fa-check"></i>
  </div>
</button>
`,
                styles: [`:host .button-progress{padding:0;min-height:40px;min-width:190px;overflow:hidden;position:relative}:host .button-progress .btn-text{padding:11px 2.5px;text-align:center}:host .button-progress .btn-loading{position:relative}:host .button-progress .btn-loading .loader{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);display:inline-block;line-height:6px}:host .button-progress .btn-loading .loader span{display:inline-block;width:6px;height:6px;border-radius:50%;background:#fff;margin:0 3px;-webkit-animation:.6s infinite load;animation:.6s infinite load}:host .button-progress .btn-loading .loader span:nth-child(2){-webkit-animation-delay:.1s;animation-delay:.1s}:host .button-progress .btn-loading .loader span:nth-child(3){-webkit-animation-delay:.2s;animation-delay:.2s}:host .button-progress .btn-loading,:host .button-progress .btn-success,:host .button-progress .btn-text{display:block;-webkit-transition:opacity .1s ease-in-out,-webkit-transform .2s ease-in-out;transition:opacity .1s ease-in-out,-webkit-transform .2s ease-in-out;transition:transform .2s ease-in-out,opacity .1s ease-in-out;transition:transform .2s ease-in-out,opacity .1s ease-in-out,-webkit-transform .2s ease-in-out;position:absolute;top:0;left:0;right:0;bottom:0}:host .button-progress .btn-loading{-webkit-transform:translate(0,100%);transform:translate(0,100%);opacity:0}:host .button-progress .btn-onSuccess{-webkit-transform:translate(0,100%);transform:translate(0,100%);opacity:0}:host .button-progress.btn-loading{pointer-events:none}:host .button-progress.btn-loading .btn-text{-webkit-transform:translate(0,-100%);transform:translate(0,-100%);opacity:0}:host .button-progress.btn-loading .btn-onSuccess{-webkit-transform:translate(0,-100%);transform:translate(0,-100%);opacity:0}:host .button-progress.btn-loading .btn-loading{-webkit-transform:translate(0,0);transform:translate(0,0);opacity:1}:host .button-progress.btn-onSuccess{pointer-events:none}:host .button-progress.btn-onSuccess .btn-text{-webkit-transform:translate(0,-100%);transform:translate(0,-100%);opacity:0}:host .button-progress.btn-onSuccess .btn-loading{-webkit-transform:translate(0,-100%);transform:translate(0,-100%);opacity:0}:host .button-progress.btn-onSuccess .btn-onSuccess{-webkit-transform:translate(0,0);transform:translate(0,0);opacity:1}@-webkit-keyframes load{from,to{opacity:.6;-webkit-transform:scale(1);transform:scale(1)}30%,80%{opacity:.7;-webkit-transform:scale(1.1);transform:scale(1.1)}50%{opacity:1;-webkit-transform:scale(1.4);transform:scale(1.4)}}@keyframes load{from,to{opacity:.6;-webkit-transform:scale(1);transform:scale(1)}30%,80%{opacity:.7;-webkit-transform:scale(1.1);transform:scale(1.1)}50%{opacity:1;-webkit-transform:scale(1.4);transform:scale(1.4)}}`]
            },] },
];
/** @nocollapse */
ProgressButtonComponent.propDecorators = {
    "btnClass": [{ type: Input },],
    "btnType": [{ type: Input },],
    "btnStateLoading": [{ type: Input },],
    "btnStateSuccess": [{ type: Input },],
    "btnDisabled": [{ type: Input },],
};
function ProgressButtonComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ProgressButtonComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ProgressButtonComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ProgressButtonComponent.propDecorators;
    /** @type {?} */
    ProgressButtonComponent.prototype.btnClass;
    /** @type {?} */
    ProgressButtonComponent.prototype.btnType;
    /** @type {?} */
    ProgressButtonComponent.prototype.btnStateLoading;
    /** @type {?} */
    ProgressButtonComponent.prototype.btnStateSuccess;
    /** @type {?} */
    ProgressButtonComponent.prototype.btnDisabled;
}
//# sourceMappingURL=progress-button.component.js.map