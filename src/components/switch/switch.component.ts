import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiRequestService } from '../../utils/abstracts/abstract-api-request.service';

@Component({
    moduleId: module.id,
    selector: '<switch-component>',
    templateUrl: 'switch.component.html',
})
export class SwitchComponent implements OnInit, OnDestroy, OnChanges {

    public remoteError = '';
    public isChanged = false;

    @Input('inputClass') inputClass: string;
    @Input('inputDisabled') inputDisabled: boolean;
    @Input('inputValue') inputValue: any;
    @Input('inputFormControlName') inputFormControlName = 'defaultControl';
    @Input('inputFormGroup') inputFormGroup: FormGroup = new FormGroup({ defaultControl: new FormControl() });
    @Input('displayChanges') displayChanges = false;
    @Input('disableErrors') disableErrors = false;

    @Output() onChanged: EventEmitter<boolean> = new EventEmitter();

    private errorSubscription: any;
    private initalValue: any;

    constructor(private api: ApiRequestService) { }

    ngOnInit(): void {
        if (this.inputFormGroup.get(this.inputFormControlName).value === null) {
            this.inputFormGroup.get(this.inputFormControlName).setValue(false);
        }
        this.initalValue = this.inputFormGroup.get(this.inputFormControlName).value;
        if (this.inputValue) {
            this.initalValue = this.inputValue;
            this.inputFormGroup.controls[this.inputFormControlName].setValue(this.initalValue);
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
        if (this.initalValue !== this.inputFormGroup.get(this.inputFormControlName).value) {
            this.isChanged = true;
        } else {
            this.isChanged = false;
        }
        this.remoteError = '';
        this.onChanged.emit(true);
    }

    hasErrors(): boolean {
        return (!this.disableErrors
            && !this.inputFormGroup.controls[this.inputFormControlName].valid
            && !this.inputFormGroup.controls[this.inputFormControlName].pristine);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.inputValue) {
            this.inputFormGroup.controls[this.inputFormControlName].setValue(changes.inputValue.currentValue);
        }
    }
}
