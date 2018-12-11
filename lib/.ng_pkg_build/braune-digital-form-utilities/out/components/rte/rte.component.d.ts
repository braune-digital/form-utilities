import { FormInputComponent } from '../form-input.component';
import { DefaultValueAccessor, FormControl } from '@angular/forms';
import { FormErrorService } from '../../services/form-error.service';
import { CKEditorComponent } from 'ng2-ckeditor';
import { FormUtilitiesOptions } from '../../form-utilities.module';
export declare class RteComponent extends FormInputComponent {
    protected _options: FormUtilitiesOptions;
    formErrorService: FormErrorService;
    input: DefaultValueAccessor;
    editor: CKEditorComponent;
    rteConfig: {};
    label: string;
    help: string;
    inputClass: string;
    placeholder: string;
    disableErrors: boolean;
    formControl: FormControl;
    onChange: (_: any) => void;
    onTouched: () => void;
    constructor(_options: FormUtilitiesOptions, formErrorService: FormErrorService);
    writeValue(writeValue: any): void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
}
