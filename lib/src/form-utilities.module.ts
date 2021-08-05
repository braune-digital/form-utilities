import { ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SelectDirective } from './directives/select/select.directive';
import { FormErrorService } from './services/form-error.service';
import { FormErrorInterceptor } from './interceptors/form-error.interceptor';
import { InputComponent } from './components/input/input.component';
import { ProgressButtonComponent } from './components/progress-button/progress-button.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DaterangeComponent } from './components/daterange/daterange.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DatetimepickerComponent } from './components/datetimepicker/datetimepicker.component';
import { FormLabelComponent } from './components/utilities/form-label/form-label.component';
import { FormErrorsComponent } from './components/utilities/form-errors/form-errors.component';
import { FormHelpComponent } from './components/utilities/form-help/form-help.component';
import { QuillModule } from 'ngx-quill';
import { RteComponent } from './components/rte/rte.component';
import { FormTipsComponent } from './components/utilities/form-tips/form-tips.component';
import { FormRequiredComponent } from './components/utilities/form-required/form-required.component';
import { MaxLengthDirective } from './directives/max-length.directive';
import { FormCounterComponent } from './components/utilities/form-counter/form-counter.component';
import { FormAddonComponent } from './components/utilities/form-addon/form-addon.component';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { TimepickerComponent } from './components/timepicker/timepicker.component';

/* Define DE Locale for german Datepicker version */
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import {FormLabelIconComponent} from './components/utilities/form-label-icon/form-label-icon.component';
import {RadioComponent} from './components/radio/radio.component';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {PopoverModule} from "ngx-bootstrap/popover";
import { FormReadonlyLabelComponent } from './components/utilities/form-readonly-label/form-readonly-label.component';

defineLocale('de', deLocale);


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
  classFormReadonly?: string,
  classFormCounter?: string;
  classFormError?: string;
  classFormHelp?: string;
  classFormRequired?: string;
  classIconBase?: string;
  requiredString?: string;
  maxLengthString?: string;
  minLengthString?: string;
  readonlyString?: string;
  counterBefore?: boolean;
}

export const DefaultFormUtilitiesOptions: FormUtilitiesOptions = {
  displayErrors: true,
  classFormGroup: 'form-group',
  classFromInput: 'form-input',
  classFormInputGroup: 'input-group',
  classFormInputGroupPrepend: 'input-group-prepend',
  classFormInputGroupAppend: 'input-group-append',
  classFormInputGroupText: 'input-group-text',
  classFromLegend: 'form-legend',
  classFormLabel: 'form-label',
  classFormReadonly: 'form-readonly',
  classFormControl: 'form-control',
  classFormCounter: 'form-counter',
  classFormError: 'form-errors',
  classFormHelp: 'form-help',
  classFormRequired: 'form-required',
  classIconBase: 'far',
  requiredString: '*',
  maxLengthString: 'Noch %s Zeichen',
  minLengthString: 'Es fehlen noch %s Zeichen',
  readonlyString: 'Readonly mode',
  counterBefore: true
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    TranslateModule,
    TooltipModule,
    PopoverModule,
    BsDatepickerModule,
    TimepickerModule,
    TextareaAutosizeModule,
    QuillModule
  ],
  declarations: [
    InputComponent,
    DatepickerComponent,
    DaterangeComponent,
    TextareaComponent,
    RteComponent,
    SelectDirective,
    ProgressButtonComponent,
    CheckboxComponent,
    DatetimepickerComponent,
    RadioComponent,

    MaxLengthDirective,

    FormLabelComponent,
    FormLabelIconComponent,
    FormErrorsComponent,
    FormHelpComponent,
    FormTipsComponent,
    FormRequiredComponent,
    FormCounterComponent,
    FormAddonComponent,
    FormReadonlyLabelComponent,
    TimepickerComponent
  ],
  exports: [
    NgSelectModule,
    InputComponent,
    DatepickerComponent,
    DaterangeComponent,
    TextareaComponent,
    RteComponent,
    SelectDirective,
    ProgressButtonComponent,
    CheckboxComponent,
    DatetimepickerComponent,
    RadioComponent,

    MaxLengthDirective,

    FormLabelComponent,
    FormLabelIconComponent,
    FormErrorsComponent,
    FormHelpComponent,
    FormTipsComponent,
    FormRequiredComponent,
    FormCounterComponent,
    FormAddonComponent,
    TimepickerComponent,
    FormReadonlyLabelComponent,
  ],
})

export class FormUtilitiesModule {
  static forRoot(options: FormUtilitiesOptions = DefaultFormUtilitiesOptions): ModuleWithProviders<FormUtilitiesModule> {
    return {
      ngModule: FormUtilitiesModule,
      providers: [
        FormErrorService,
        { provide: 'FormUtilitiesOptions', useValue: Object.assign({}, DefaultFormUtilitiesOptions, options) || DefaultFormUtilitiesOptions },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FormErrorInterceptor,
          multi: true
        }
      ]
    };
  }
}
