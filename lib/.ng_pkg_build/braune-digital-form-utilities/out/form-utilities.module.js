/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDirective } from './directives/select/select.directive';
import { FormErrorService } from './services/form-error.service';
import { FormErrorInterceptor } from './interceptors/form-error.interceptor';
import { InputComponent } from './components/input/input.component';
import { ProgressButtonComponent } from './components/progress-button/progress-button.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { CkeditorComponent } from './components/ckeditor/ckeditor.component';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DaterangeComponent } from './components/daterange/daterange.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DatetimepickerComponent } from './components/datetimepicker/datetimepicker.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormLabelComponent } from './components/utilities/form-label/form-label.component';
import { FormErrorsComponent } from './components/utilities/form-errors/form-errors.component';
import { FormHelpComponent } from './components/utilities/form-help/form-help.component';
import { QuillModule } from 'ngx-quill';
import { RteComponent } from './components/rte/rte.component';
import { AutosizeDirective } from './directives/autosize.directive';
import { FormTipsComponent } from './components/utilities/form-tips/form-tips.component';
import { PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { FormRequiredComponent } from './components/utilities/form-required/form-required.component';
import { MaxLengthDirective } from './directives/max-length.directive';
import { FormCounterComponent } from './components/utilities/form-counter/form-counter.component';
import { FormAddonComponent } from './components/utilities/form-addon/form-addon.component';
/**
 * @record
 */
export function FormUtilitiesOptions() { }
function FormUtilitiesOptions_tsickle_Closure_declarations() {
    /** @type {?} */
    FormUtilitiesOptions.prototype.displayErrors;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classFormGroup;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classFromInput;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classFormInputGroup;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classFormInputGroupPrepend;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classFormInputGroupAppend;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classFormInputGroupText;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classFromLegend;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classFormLabel;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classFormControl;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classFormCounter;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classFormError;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classFormHelp;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classFormRequired;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.classIconBase;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.requiredString;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.maxLengthString;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.minLengthString;
    /** @type {?|undefined} */
    FormUtilitiesOptions.prototype.counterBefore;
}
export const /** @type {?} */ DefaultFormUtilitiesOptions = {
    displayErrors: true,
    classFormGroup: 'form-group',
    classFromInput: 'form-input',
    classFormInputGroup: 'input-group',
    classFormInputGroupPrepend: 'input-group-prepend',
    classFormInputGroupAppend: 'input-group-append',
    classFormInputGroupText: 'input-group-text',
    classFromLegend: 'form-legend',
    classFormLabel: 'form-label',
    classFormControl: 'form-control',
    classFormCounter: 'form-counter',
    classFormError: 'form-errors',
    classFormHelp: 'form-help',
    classFormRequired: 'form-required',
    classIconBase: 'far',
    requiredString: '*',
    maxLengthString: 'Noch %s Zeichen',
    minLengthString: 'Es fehlen noch %s Zeichen',
    counterBefore: true
};
export class FormUtilitiesModule {
    /**
     * @param {?=} options
     * @return {?}
     */
    static forRoot(options = { displayErrors: true }) {
        return {
            ngModule: FormUtilitiesModule,
            providers: [
                FormErrorService,
                { provide: 'options', useValue: options || DefaultFormUtilitiesOptions },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: FormErrorInterceptor,
                    multi: true
                }
            ]
        };
    }
}
FormUtilitiesModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    NgSelectModule,
                    CKEditorModule,
                    TranslateModule,
                    TooltipModule.forRoot(),
                    PopoverModule.forRoot(),
                    BsDatepickerModule.forRoot(),
                    TimepickerModule.forRoot(),
                    QuillModule
                ],
                declarations: [
                    InputComponent,
                    DatepickerComponent,
                    DaterangeComponent,
                    TextareaComponent,
                    CkeditorComponent,
                    RteComponent,
                    SelectDirective,
                    ProgressButtonComponent,
                    CheckboxComponent,
                    DatetimepickerComponent,
                    AutosizeDirective,
                    MaxLengthDirective,
                    FormLabelComponent,
                    FormErrorsComponent,
                    FormHelpComponent,
                    FormTipsComponent,
                    FormRequiredComponent,
                    FormCounterComponent,
                    FormAddonComponent
                ],
                exports: [
                    NgSelectModule,
                    InputComponent,
                    DatepickerComponent,
                    DaterangeComponent,
                    TextareaComponent,
                    CkeditorComponent,
                    RteComponent,
                    SelectDirective,
                    ProgressButtonComponent,
                    CheckboxComponent,
                    DatetimepickerComponent,
                    AutosizeDirective,
                    MaxLengthDirective,
                    FormLabelComponent,
                    FormErrorsComponent,
                    FormHelpComponent,
                    FormTipsComponent,
                    FormRequiredComponent,
                    FormCounterComponent,
                    FormAddonComponent
                ],
            },] },
];
function FormUtilitiesModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormUtilitiesModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormUtilitiesModule.ctorParameters;
}
//# sourceMappingURL=form-utilities.module.js.map