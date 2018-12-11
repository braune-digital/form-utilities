import { FormInputComponent } from '../form-input.component';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { FormErrorService } from '../../services/form-error.service';
import { FormUtilitiesOptions } from '../../form-utilities.module';
import { BsDatepickerConfig, BsLocaleService, DatePickerComponent } from 'ngx-bootstrap';
export declare class DatetimepickerComponent extends FormInputComponent implements ControlValueAccessor, OnInit {
    protected _options: FormUtilitiesOptions;
    formErrorService: FormErrorService;
    langService: BsLocaleService;
    input: any;
    dateTime: {
        date: Date;
        time: Date;
    };
    isDisabled: boolean;
    dp: DatePickerComponent;
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
    isMeridian: boolean;
    onChange: (_: any) => void;
    onTouched: () => void;
    constructor(_options: FormUtilitiesOptions, formErrorService: FormErrorService, langService: BsLocaleService);
    writeValue(value: string): void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    onDateChange(date: any): void;
    onTimeChange(date: any): void;
    ngOnInit(): void;
}
