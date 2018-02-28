import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ColorPickerModule } from 'ngx-color-picker';
import { FileUploadModule } from 'ng2-file-upload';
import { TooltipModule } from 'ngx-bootstrap';

import { ValidateOnBlurDirective } from './directives/validate-on-blur.directive';
import { ApiRequestService } from './utils/abstracts/abstract-api-request.service';
import { ApiRequestServiceFaker } from './services/api-request-faker.service';
import {
    ButtonProgressComponent,
    ColorPickerComponent,
    DatePickerComponent, FileUploadComponent,
    InputComponent, IqSelect2Module, PasswordMeterComponent, RadioComponent, RemoteErrors, SelectComponent,
    SwitchComponent,
    TextareaComponent, TranslationFormGroupComponent
} from './components';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IqSelect2Module,
        FileUploadModule,
        ColorPickerModule,
        NgxMyDatePickerModule.forRoot(),
    ],
    declarations: [
        InputComponent,
        TextareaComponent,
        SelectComponent,
        SwitchComponent,
        RadioComponent,
        DatePickerComponent,
        PasswordMeterComponent,
        TranslationFormGroupComponent,
        ColorPickerComponent,

        FileUploadComponent,

        ButtonProgressComponent,
        RemoteErrors,

        ValidateOnBlurDirective,
    ],
    exports: [
        InputComponent,
        TextareaComponent,
        SelectComponent,
        SwitchComponent,
        RadioComponent,
        DatePickerComponent,
        PasswordMeterComponent,
        TranslationFormGroupComponent,
        TooltipModule,
        IqSelect2Module,
        NgxMyDatePickerModule,
        ColorPickerComponent,

        FileUploadComponent,

        ButtonProgressComponent,
        RemoteErrors,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormUtilitiesModule {
    static forRoot(config: { api?: Provider } = {}): ModuleWithProviders {
        return {
            ngModule: FormUtilitiesModule,
            providers: [
                config.api || { provide: ApiRequestService, useClass: ApiRequestServiceFaker }
            ]
        };
    }
}
