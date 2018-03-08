import { ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputComponent } from './components/input/input.component';
import { SelectDirective } from './directives/select/select.directive';
import { ProgressButtonComponent } from './components/progress-button/progress-button.component';
import { FormErrorService } from './services/form-error.service';
import { FormErrorInterceptor } from './interceptors/form-error.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [
    InputComponent,
    SelectDirective,
    ProgressButtonComponent
  ],
  exports: [
    NgSelectModule,

    InputComponent,
    SelectDirective,
    ProgressButtonComponent
  ],
})
export class FormUtilitiesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FormUtilitiesModule,
      providers: [
        FormErrorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FormErrorInterceptor,
          multi: true
        }
      ]
    };
  }
}
