import { AsyncValidatorFn, NgControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ChangeDetectorRef, Directive, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Directive({
    selector: '[vob]',
})
export class ValidateOnBlurDirective {

    @Input() vob = true;
    @Input() vobSync = true;
    @Input() vobAsync = true;
    @Input() vobUseTimeout = false;
    @Input() vobWithOnPush = false;

    private syncValidators: ValidatorFn;
    private asyncValidators: AsyncValidatorFn;

    private hasFocus = false;

    private timeoutId: any;

    constructor(private formControl: NgControl, private cdr: ChangeDetectorRef) {
    }

    @HostListener('focus')
    onFocus(): void {
        if (this.vob) {
            this.disableValidators();
        }
    }

    @HostListener('blur')
    onBlur(): void {
        if (this.vob) {
            this.enableValidators();
        }
    }

    @HostListener('keyup')
    onKeyUp(): void {
        if (this.vob && this.vobUseTimeout) {
            if (this.timeoutId) {
                window.clearTimeout(this.timeoutId);
            }
            this.timeoutId = window.setTimeout(() => {
                this.validateInputOnce();
            }, 500);
        }
    }

    disableValidators(): void {
        const control = this.formControl.control;
        this.hasFocus = true;
        if (this.vobSync) {
            this.syncValidators = control.validator;
            control.clearValidators();
        }
        if (this.vobAsync) {
            this.asyncValidators = control.asyncValidator;
            control.clearAsyncValidators();
        }
        control.valueChanges.filter(() => this.hasFocus).subscribe(() => control.markAsPending());
    }

    enableValidators(): void {
        const control = this.formControl.control;
        this.hasFocus = false;
        if (this.vobSync) {
            control.setValidators(this.syncValidators);
        }
        if (this.vobAsync) {
            control.setAsyncValidators(this.asyncValidators);
        }
        if (this.vobWithOnPush) {
            this.cdr.markForCheck();
        }
        control.updateValueAndValidity();
    }

    validateInputOnce(): void {
        const control = this.formControl.control;
        if (this.vobSync && this.syncValidators) {
            control.setErrors(this.syncValidators(control));
        }
        if (this.vobAsync && this.asyncValidators) {
            (<Observable<ValidationErrors>>this.asyncValidators(control)).subscribe(errors => {
                control.setErrors(errors);
            });
        }
        if (this.vobWithOnPush) {
            this.cdr.markForCheck();
        }
    }
}
