import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiRequestService } from '../../utils/abstracts/abstract-api-request.service';

@Component({
    moduleId: module.id,
    selector: 'radio-component',
    templateUrl: 'radio.component.html',
})
export class RadioComponent implements OnInit, OnDestroy {

    public remoteError = '';

    @Input('inputClass') inputClass: string;
    @Input('inputValue') inputValue: any = '';
    @Input('inputDisabled') inputDisabled: boolean;
    @Input('inputFormControlName') inputFormControlName: string;
    @Input('inputFormGroup') inputFormGroup: FormGroup;
    @Input('disableErrors') disableErrors = false;

    private errorSubscription: any;

    constructor(private api: ApiRequestService) { }


    ngOnInit(): void {
        this.errorSubscription = this.api.propertyError.subscribe((error: any) => {
            if (error.property_path && error.property_path === this.inputFormControlName) {
                this.remoteError = error.message;
            }
        });

        this.inputFormGroup.get(this.inputFormControlName.toString()).valueChanges.subscribe(
            () => {
                this.inputFormGroup.get(this.inputFormControlName.toString()).markAsTouched();
            }
        );
    }

    ngOnDestroy(): void {
        if (typeof this.errorSubscription !== 'undefined') {
            this.errorSubscription.unsubscribe();
        }
    }

    hasErrors(): boolean {
        return (
            !this.disableErrors
            && this.inputFormGroup.controls[this.inputFormControlName].errors
            && this.inputFormGroup.controls[this.inputFormControlName].dirty
        );
    }
}
