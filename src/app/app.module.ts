import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormUtilitiesModule } from '../../lib/src/form-utilities.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {QuillModule} from "ngx-quill";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {PopoverModule} from "ngx-bootstrap/popover";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    QuillModule.forRoot(),
    FormUtilitiesModule.forRoot({
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
    }),
    TranslateModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



