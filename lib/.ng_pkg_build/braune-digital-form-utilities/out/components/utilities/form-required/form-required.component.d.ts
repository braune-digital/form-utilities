import { FormUtilitiesOptions } from '../../../form-utilities.module';
import { DomSanitizer } from '@angular/platform-browser';
export declare class FormRequiredComponent {
    _options: FormUtilitiesOptions;
    private _sanitizer;
    required: boolean;
    constructor(_options: FormUtilitiesOptions, _sanitizer: DomSanitizer);
    readonly options: FormUtilitiesOptions;
    readonly requiredString: any;
}
