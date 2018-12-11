import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';
export declare class InputComponent extends FormInputComponent implements ControlValueAccessor {
    protected _options: FormUtilitiesOptions;
    formErrorService: FormErrorService;
    input: DefaultValueAccessor;
    label: string;
    inputClass: string;
    placeholder: string;
    type: string;
    step: string;
    disableErrors: boolean;
    formControl: FormControl;
    onInputKeypress: EventEmitter<string>;
    onInputChange: EventEmitter<string>;
    onInputKeyup: EventEmitter<string>;
    onFocus: EventEmitter<string>;
    onFocusOut: EventEmitter<string>;
    constructor(_options: FormUtilitiesOptions, formErrorService: FormErrorService);
    handleOnInputKeypress(value: string): void;
    handleOnInputChange(value: string): void;
    handleOnInputKeyup(value: string): void;
    handleOnFocus(value: string): void;
    handleOnFocusOut(value: string): void;
}
