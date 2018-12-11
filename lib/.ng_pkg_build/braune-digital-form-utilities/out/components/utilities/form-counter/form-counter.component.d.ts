import { FormUtilitiesOptions } from '../../../form-utilities.module';
import { FormControl } from '@angular/forms';
export declare class FormCounterComponent {
    _options: FormUtilitiesOptions;
    maxLength: number;
    form: FormControl;
    constructor(_options: FormUtilitiesOptions);
    readonly options: FormUtilitiesOptions;
    getMaxLenghtLabel(): string;
}
