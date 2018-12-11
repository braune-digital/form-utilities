import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl } from '@angular/forms';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';
export declare class TextareaComponent extends FormInputComponent implements ControlValueAccessor {
    protected _options: FormUtilitiesOptions;
    formErrorService: FormErrorService;
    input: DefaultValueAccessor;
    label: string;
    help: string;
    inputClass: string;
    placeholder: string;
    disableErrors: boolean;
    formControl: FormControl;
    constructor(_options: FormUtilitiesOptions, formErrorService: FormErrorService);
}
