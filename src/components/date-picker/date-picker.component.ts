import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IMyDate, INgxMyDpOptions, NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { ApiRequestService } from '../../utils/abstracts/abstract-api-request.service';
import { HelperDate } from '../../';

@Component({
    moduleId: module.id,
    selector: 'date-picker-component',
    templateUrl: 'date-picker.component.html',
    styleUrls: ['date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, OnDestroy {

    public remoteError = '';

    @Input() dpClass: string;
    @Input() dpDisabled = false;
    @Input() dpPlaceholder = '';
    @Input() dpLabel: string;
    @Input() dpFormControlName: string;
    @Input() dpFormGroup: FormGroup;
    @Input() dpDisableErrors = false;
    @Input() dpOptions: INgxMyDpOptions = {};
    @Input() disableSince: IMyDate;

    /**
     * Indicates if the question is used in the builder or in the questionnaire.
     *
     * @type {boolean}
     */
    @Input() isBuilder = false;

    @Input() vob = true;
    @Input() vobSync = true;
    @Input() vobAsync = true;
    @Input() vobUseTimeout = true;
    @Input() vobWithOnPush = false;

    @ViewChild('dp') dp: NgxMyDatePickerDirective;

    allowValidating = false;

    myOptions: INgxMyDpOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd',
        showWeekNumbers: false,
        showTodayBtn: false,
        firstDayOfWeek: 'mo',
        sunHighlight: false,
        monthSelector: false,
        yearSelector: false,
        dayLabels: {su: 'Su', mo: 'Mo', tu: 'Tu', we: 'We', th: 'Th', fr: 'Fr', sa: 'Sa'},
    };

    private errorSubscription: any;

    constructor(private api: ApiRequestService, private translate: TranslateService, private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {

        if (this.isBuilder) {
            this.dpFormGroup.get(this.dpFormControlName.toString()).enable();
        }

        if(this.dpFormGroup.controls[this.dpFormControlName].value){
            this.dpFormGroup.controls[this.dpFormControlName].setValue(this.getLocalDate(this.dpFormGroup.controls[this.dpFormControlName].value));
        }


        if (this.disableSince) {
            this.myOptions.disableSince = this.disableSince;
        }

        if (this.dpPlaceholder) {
            this.dpPlaceholder = this.translate.instant(this.dpPlaceholder);
        }

        this.errorSubscription = this.api.propertyError.subscribe((error: any) => {
            if (error.property_path && error.property_path === this.dpFormControlName) {
                this.remoteError = error.message;
            }
        });

        // Only allow validating after first visit of the calender-picker
        this.dp.calendarToggle.subscribe((event: number) => {
            if (event > 1) {
                this.allowValidating = true;
            }
        });

        this.myOptions = (<INgxMyDpOptions> Object.assign(this.myOptions, this.dpOptions));

    }

    getLocalDate(date: string): object{
        const localDate = HelperDate.toUtcDate(date);
        return { date: {
            day: Number.parseInt(localDate.format('DD')),
            month: Number.parseInt(localDate.format('MM')),
            year: Number.parseInt(localDate.format('YYYY'))
        }};
    }

    ngOnDestroy(): void {
        if (typeof this.errorSubscription !== 'undefined') {
            this.errorSubscription.unsubscribe();
        }
    }

    showCalendar(): void {
        if (this.dpDisabled) {
            return;
        }
        this.dp.openCalendar();
        this.cdr.detectChanges();
        this.dpFormGroup.updateValueAndValidity();
        // setTimeout(() => this.dp.openCalendar(), 500);
    }

    toggleCalendar(): void {
        if (this.dpDisabled) {
            return;
        }
        this.dp.toggleCalendar();
    }

    errors(): Array<string> {
        if (!this.hasErrors()) {
            return [];
        }

        const errors = this.dpFormGroup.get(this.dpFormControlName).errors;
        if (errors) {
            return Object.keys(errors);
        }
        return [];
    }

    hasErrors(): boolean {
        return (!this.dpDisableErrors
            && this.allowValidating
            && this.dpFormGroup instanceof FormGroup
            && this.dpFormGroup.controls[this.dpFormControlName].errors
            && this.dpFormGroup.controls[this.dpFormControlName].dirty);
    }
}
