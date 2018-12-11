import { FormUtilitiesOptions } from '../../../form-utilities.module';
import { DomSanitizer } from '@angular/platform-browser';
export declare class FormAddonComponent {
    _options: FormUtilitiesOptions;
    private _sanitizer;
    text: string;
    position: string;
    readonly hostClasses: string;
    constructor(_options: FormUtilitiesOptions, _sanitizer: DomSanitizer);
    readonly options: FormUtilitiesOptions;
    readonly addonString: any;
}
