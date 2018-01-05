import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApiRequestService } from '../../utils/abstracts/abstract-api-request.service';

@Component({
    moduleId: module.id,
    selector: 'input-component',
    templateUrl: 'input.component.html',
})
export class InputComponent implements OnInit, OnDestroy {

    public remoteError = '';

    @Input('inputClass') inputClass: string;
    @Input('inputType') inputType = 'text';
    @Input('inputDisabled') inputDisabled: boolean;
    @Input('inputPlaceholder') inputPlaceholder: string;
    @Input('inputLabel') inputLabel: string;
    @Input('inputFormControlName') inputFormControlName = 'defaultControl';
    @Input('inputFormGroup') inputFormGroup: FormGroup = new FormGroup({ [this.inputFormControlName]: new FormControl() });
    @Input('disableErrors') disableErrors = false;

    @Input() step = 1;

    @Input() vob = true;
    @Input() vobSync = true;
    @Input() vobAsync = true;
    @Input() vobUseTimeout = true;
    @Input() vobWithOnPush = false;

    private errorSubscription: any;

    constructor(protected api: ApiRequestService, protected translate: TranslateService) { }

    ngOnInit(): void {
        if (this.inputPlaceholder) {
            this.translate.get(this.inputPlaceholder).subscribe((res: string) => {
                this.inputPlaceholder = res;
            });
        }
        if (this.inputLabel) {
            this.translate.get(this.inputLabel).subscribe((res: string) => {
                this.inputLabel = res;
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
            return Object.keys(errors).map(key => {
                if (key.startsWith('hard') || key.startsWith('soft')) {
                    return errors[key];
                } else {
                    return 'forms.errors.' + key;
                }
            });
        }
        return [];
    }

    hasErrors(): boolean {

        return (!this.disableErrors
            && this.inputFormGroup instanceof FormGroup
            && this.inputFormGroup.controls[this.inputFormControlName].errors
            && this.inputFormGroup.controls[this.inputFormControlName].dirty);
    }
}
