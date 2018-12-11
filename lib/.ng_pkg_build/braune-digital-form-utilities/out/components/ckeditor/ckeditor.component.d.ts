import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl } from '@angular/forms';
import { FormErrorService } from '../../services/form-error.service';
import { CKEditorComponent } from 'ng2-ckeditor';
import { FormUtilitiesOptions } from '../../form-utilities.module';
export declare class CkeditorComponent extends FormInputComponent implements ControlValueAccessor {
    protected _options: FormUtilitiesOptions;
    formErrorService: FormErrorService;
    input: DefaultValueAccessor;
    editor: CKEditorComponent;
    ckeditorConfig: {};
    inputClass: string;
    label: string;
    placeholder: string;
    disableErrors: boolean;
    formControl: FormControl;
    onChange: (_: any) => void;
    onTouched: () => void;
    constructor(_options: FormUtilitiesOptions, formErrorService: FormErrorService);
    onEditorChange(_value: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
}
