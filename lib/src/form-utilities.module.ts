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

export interface FormUtilitiesOptions {
  displayErrors: boolean
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CKEditorModule,
    TranslateModule,
  ],
  declarations: [
    InputComponent,
    TextareaComponent,
    CkeditorComponent,
    SelectDirective,
    ProgressButtonComponent
  ],
  exports: [
    NgSelectModule,

    InputComponent,
    TextareaComponent,
    CkeditorComponent,
    SelectDirective,
    ProgressButtonComponent
  ],
})
export class FormUtilitiesModule {
  static forRoot(options: FormUtilitiesOptions = {displayErrors: true}): ModuleWithProviders {
    return {
      ngModule: FormUtilitiesModule,
      providers: [
        FormErrorService,
        {provide: 'options', useValue: options},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FormErrorInterceptor,
          multi: true
        }
      ]
    };
  }
}
