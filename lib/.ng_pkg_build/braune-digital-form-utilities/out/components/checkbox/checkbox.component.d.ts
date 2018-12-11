import { FormInputComponent } from '../form-input.component';
import { CheckboxControlValueAccessor, ControlValueAccessor, FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';
export declare class CheckboxComponent extends FormInputComponent implements ControlValueAccessor {
    protected _options: FormUtilitiesOptions;
    formErrorService: FormErrorService;
    input: CheckboxControlValueAccessor;
    label: string;
    placeholder: string;
    inputClass: string;
    disableErrors: boolean;
    disabled: boolean;
    formControl: FormControl;
    onChange: EventEmitter<boolean>;
    isChecked: boolean;
    constructor(_options: FormUtilitiesOptions, formErrorService: FormErrorService);
    value: any;
    private onTouchedCallback;
    private onChangeCallback;
    writeValue(value: any): void;
    onInputChange(isChecked: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
}
