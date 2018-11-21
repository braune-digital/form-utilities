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
import {TextareaAutosizeModule} from 'ngx-textarea-autosize';
import {CheckboxComponent} from './components/checkbox/checkbox.component';
import {DatetimepickerComponent} from './components/datetimepicker/datetimepicker.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import {FormLabelComponent} from './components/form-label/form-label.component';
import {FormErrorsComponent} from './components/form-errors/form-errors.component';
import {FormHelpComponent} from './components/form-help/form-help.component';

export interface FormUtilitiesOptions {
  displayErrors: boolean;
  classFormGroup?: string;
  classFormControl?: string;
  classFormLabel?: string;
  classFormError?: string;
  classFormHelp?: string;
}

export const DefaultFormUtilitiesOptions: FormUtilitiesOptions = {
  displayErrors: true,
  classFormGroup: 'form-group',
  classFormControl: 'form-control',
  classFormLabel: 'form-label',
  classFormError: 'form-errors',
  classFormHelp: 'form-help'
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CKEditorModule,
    TranslateModule,
    BsDatepickerModule.forRoot(),
    TextareaAutosizeModule,
    TimepickerModule.forRoot()
  ],
  declarations: [
    InputComponent,
    DatepickerComponent,
    DaterangeComponent,
    TextareaComponent,
    CkeditorComponent,
    SelectDirective,
    ProgressButtonComponent,
    CheckboxComponent,
    DatetimepickerComponent,
    FormLabelComponent,
    FormErrorsComponent,
    FormHelpComponent,
  ],
  exports: [
    NgSelectModule,
    InputComponent,
    DatepickerComponent,
    DaterangeComponent,
    TextareaComponent,
    CkeditorComponent,
    SelectDirective,
    ProgressButtonComponent,
    CheckboxComponent,
    DatetimepickerComponent,
    FormLabelComponent,
    FormErrorsComponent,
    FormHelpComponent,
  ],
})

export class FormUtilitiesModule {
  static forRoot(options: FormUtilitiesOptions = { displayErrors: true }): ModuleWithProviders {
    return {
      ngModule: FormUtilitiesModule,
      providers: [
        FormErrorService,
        {provide: 'options', useValue: DefaultFormUtilitiesOptions},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FormErrorInterceptor,
          multi: true
        }
      ]
    };
  }
}
