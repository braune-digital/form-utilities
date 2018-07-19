import { ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent, ProgressButtonComponent } from './components';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormErrorInterceptor } from './interceptors';
import { FormErrorService } from './services';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDirective } from './directives';

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
export class BDFormUtilitiesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BDFormUtilitiesModule,
      providers: [
        FormErrorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FormErrorInterceptor,
          multi: true
        }
      ]
    }
  }
}
