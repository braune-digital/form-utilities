import { ModuleWithProviders, NgModule } from '@angular/core';

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
import {CheckboxComponent} from './components/checkbox/checkbox.component';
import {DatetimepickerComponent} from './components/datetimepicker/datetimepicker.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import {FormLabelComponent} from './components/utilities/form-label/form-label.component';
import {FormErrorsComponent} from './components/utilities/form-errors/form-errors.component';
import {FormHelpComponent} from './components/utilities/form-help/form-help.component';
import { QuillModule } from 'ngx-quill';
import { RteComponent } from './components/rte/rte.component';
import { AutosizeDirective } from './directives/autosize.directive';
import {FormTipsComponent} from './components/utilities/form-tips/form-tips.component';
import {PopoverModule, TooltipModule} from 'ngx-bootstrap';
import {FormRequiredComponent} from './components/utilities/form-required/form-required.component';
import {MaxLengthDirective} from './directives/max-length.directive';
import {FormCounterComponent} from './components/utilities/form-counter/form-counter.component';
import {FormAddonComponent} from './components/utilities/form-addon/form-addon.component';

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

@NgModule({
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
})

export class FormUtilitiesModule {
  static forRoot(options: FormUtilitiesOptions = { displayErrors: true }): ModuleWithProviders {
    return {
      ngModule: FormUtilitiesModule,
      providers: [
        FormErrorService,
        {provide: 'options', useValue: options || DefaultFormUtilitiesOptions},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FormErrorInterceptor,
          multi: true
        }
      ]
    };
  }
}
