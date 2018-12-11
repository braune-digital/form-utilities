import { ModuleWithProviders } from '@angular/core';
export interface FormUtilitiesOptions {
    displayErrors: boolean;
    classFormGroup?: string;
    classFromInput?: string;
    classFormInputGroup?: string;
    classFormInputGroupPrepend?: string;
    classFormInputGroupAppend?: string;
    classFormInputGroupText?: string;
    classFromLegend?: string;
    classFormLabel?: string;
    classFormControl?: string;
    classFormCounter?: string;
    classFormError?: string;
    classFormHelp?: string;
    classFormRequired?: string;
    classIconBase?: string;
    requiredString?: string;
    maxLengthString?: string;
    minLengthString?: string;
    counterBefore?: boolean;
}
export declare const DefaultFormUtilitiesOptions: FormUtilitiesOptions;
export declare class FormUtilitiesModule {
    static forRoot(options?: FormUtilitiesOptions): ModuleWithProviders;
}
