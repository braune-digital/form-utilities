import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApiRequestService } from '../../utils/abstracts/abstract-api-request.service';

@Component({
    moduleId: module.id,
    selector: '<textarea-component>',
    templateUrl: 'textarea.component.html',
})
export class TextareaComponent implements OnInit, OnDestroy {

    public remoteError = '';

    @Input('inputClass') inputClass: string;
    @Input('inputDisabled') inputDisabled: boolean;
    @Input('inputPlaceholder') inputPlaceholder: string;
    @Input('inputFormControlName') inputFormControlName: string;
    @Input('inputFormGroup') inputFormGroup: FormGroup;
    @Input('disableErrors') disableErrors = false;

    @Input() vob = true;
    @Input() vobSync = true;
    @Input() vobAsync = true;
    @Input() vobUseTimeout = true;
    @Input() vobWithOnPush = false;

    private errorSubscription: any;

    constructor(private api: ApiRequestService, private translate: TranslateService) {
    }


    ngOnInit(): void {

        if (this.inputPlaceholder) {
            this.translate.get(this.inputPlaceholder).subscribe((res: string) => {
                this.inputPlaceholder = res;
            });
        }

        this.errorSubscription = this.api.propertyError.subscribe((error: any) => {
            if (error.property_path && error.property_path === this.inputFormControlName) {
                this.remoteError = error.message;
            }
        });
    }

    ngOnDestroy(): void {
        if (typeof this.errorSubscription !== 'undefined') {
            this.errorSubscription.unsubscribe();
        }
    }

    onChange(): void {
        this.remoteError = '';
    }

    errors(): Array<string> {
        if (!this.hasErrors()) {
            return [];
        }

        const errors = this.inputFormGroup.get(this.inputFormControlName).errors;
        if (errors) {
            return Object.keys(errors);
        }
        return [];
    }

    hasErrors(): boolean {
        return (!this.disableErrors
            && this.inputFormGroup instanceof FormGroup
            && this.inputFormGroup.controls[this.inputFormControlName].touched
            && this.inputFormGroup.controls[this.inputFormControlName].errors
            && this.inputFormGroup.controls[this.inputFormControlName].dirty);
    }
}
