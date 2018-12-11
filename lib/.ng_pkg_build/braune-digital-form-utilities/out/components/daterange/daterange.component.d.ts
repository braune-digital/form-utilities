import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, DefaultValueAccessor, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';
import { BsDatepickerConfig, BsDaterangepickerDirective, BsLocaleService } from 'ngx-bootstrap';
export declare class DaterangeComponent extends FormInputComponent implements ControlValueAccessor, OnInit {
    protected _options: FormUtilitiesOptions;
    formErrorService: FormErrorService;
    langService: BsLocaleService;
    input: DefaultValueAccessor;
    label: string;
    help: string;
    inputClass: string;
    placeholder: string;
    disableErrors: boolean;
    formControl: FormControl;
    bsConfig: BsDatepickerConfig;
    bsLang: string;
    bsMaxDate: Date;
    bsMinDate: Date;
    daterange: BsDaterangepickerDirective;
    constructor(_options: FormUtilitiesOptions, formErrorService: FormErrorService, langService: BsLocaleService);
    ngOnInit(): void;
}
