import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { IqSelect2Item } from '../ng2-iq-select2/iq-select2/iq-select2-item';
import { IqSelect2Component } from '../ng2-iq-select2/iq-select2/iq-select2.component';
import { ApiRequestService } from '../../utils/abstracts/abstract-api-request.service';

import { ParamFilter } from '../../../filter/utils/paramfilter.class';
import { TextFilter } from '../../../filter/utils/filter/types/text.filter';
import { InFilter } from '../../../filter/utils/filter/types/in.filter';
import { Ordering } from '../../../filter/utils/filter/order';

@Component({
    moduleId: module.id,
    selector: 'select-component',
    templateUrl: 'select.component.html'
})
export class SelectComponent implements OnInit, OnDestroy {

    @Input('selectFormGroup') selectFormGroup: FormGroup = new FormGroup({ 'defaultControl': new FormControl() });
    @Input('selectFormControlName') selectFormControlName = 'defaultControl';

    @Input('selectClass') selectClass: string;
    @Input('inputLabel') inputLabel: string;
    @Input() controlClass = '';
    @Input('selectDisabled') selectDisabled: boolean;
    @Input('selectPlaceholder') selectPlaceholder = '';
    @Input('selectInputBlock') selectInputBlock = true;

    @Input('multiple') multiple = false;
    @Input('resetable') resetable = false;

    @Input('options') options: Array<IqSelect2Item> = [];
    @Input('optionValue') optionValue = 'id';
    @Input('optionLabel') optionLabel = 'text';
    @Input('translatePrefix') translatePrefix = '';

    @Input('filterWithScope') filterWithScope = true;
    @Input('filterUrl') filterUrl: string;
    @Input('filterResultsPerPage') filterResultsPerPage: number = 10;
    @Input('filterProperties') filterProperties: Array<string>;
    @Input('filterOrderings') filterOrderings: Array<Ordering> = [];
    @Input('filterPropertyValue') filterPropertyValue = 'id';
    @Input('filterPropertyLabel') filterPropertyLabel: any = 'name';

    @Input() vob = true;
    @Input() vobSync = true;
    @Input() vobAsync = true;
    @Input() vobUseTimeout = true;
    @Input() vobWithOnPush = false;

    @Input('disableErrors') disableErrors = false;
    @Input('noSearchBox') noSearchBox = false;
    @Output('onSelect') onSelect: EventEmitter<IqSelect2Item> = new EventEmitter();
    @Output('onRemove') onRemove: EventEmitter<IqSelect2Item> = new EventEmitter();

    @ViewChild(IqSelect2Component) selectComponent: IqSelect2Component;

    dataSourceProvider: (term: string) => Observable<Array<any>>;
    selectedProvider: (ids: Array<string>) => Observable<Array<any>>;
    iqSelect2ItemAdapter: (entity: any) => IqSelect2Item;
    remoteError = '';

    private errorSubscription: Subscription;
    private paramFilterDataSource: ParamFilter;
    private filterDataSource: TextFilter;
    private paramFilterSelected: ParamFilter;
    private filterSelected: InFilter;

    constructor(private api: ApiRequestService, private translateService: TranslateService) {}

    ngOnInit() {
        this.errorSubscription = this.api.propertyError.subscribe((error: any) => {
            if (error.property_path && error.property_path === this.selectFormControlName) {
                this.remoteError = error.message;
            }
        });


        if (this.inputLabel) {
            this.translateService.get(this.inputLabel).subscribe((res: string) => {
                this.inputLabel = res;
            });
        }

        // If the data comes from a remote-source
        if (this.filterUrl && this.filterProperties) {
            // Filter for data
            this.paramFilterDataSource = new ParamFilter(this.filterUrl, this.api, this.filterWithScope);
            this.paramFilterDataSource.resultsPerPage = this.filterResultsPerPage;
            this.paramFilterDataSource.setOrderings(this.filterOrderings);
            this.filterDataSource = new TextFilter(this.filterProperties, '');
            this.paramFilterDataSource.add(this.filterDataSource);

            // Filter for the pre-selected item
            this.paramFilterSelected = new ParamFilter(this.filterUrl, this.api, this.filterWithScope);
            this.filterSelected = new InFilter(this.filterPropertyValue, []);
            this.paramFilterSelected.add(this.filterSelected);

            // The paramFilterDataSources is our provider for the data
            this.dataSourceProvider = term => {
                this.filterDataSource.text = term || '';
                return this.paramFilterDataSource.refreshPromise();
            };

            // The paramFilterDataSources is our provider for the pre-selected values
            this.selectedProvider = ids => {
                this.filterSelected.values = ids;
                return this.paramFilterSelected.refreshPromise();
            };

            // Map the given data to a form the select-component can work with
            this.iqSelect2ItemAdapter = item => {
                let text: string;
                let accessor: any = item;
                if (this.filterPropertyLabel instanceof Object) {
                    const segments: Array<string> = this.filterPropertyLabel.propertyPath.split('.');
                    segments.forEach(segment => {
                        accessor = accessor[segment];
                    });
                    text = this.filterPropertyLabel.property;
                } else {
                    text = accessor[this.filterPropertyLabel];
                }
                return { id: item[this.filterPropertyValue], text: text };
            };

        } else { // The data does not come from a remote source

            // If we have a plain array of values, create an array of objects with id and text property
            if (['number', 'string'].indexOf(typeof this.options[0]) >= 0) {
                this.options = this.options.reduce((flat, toFlatten) => flat.concat({
                    [this.optionValue]: toFlatten.toString(),
                    [this.optionLabel]: toFlatten.toString()
                }), []);
            }

            // If the data comes locally (provided by an input-binding)
            this.dataSourceProvider = term => {
                return new Observable<any>(observer => {
                    this.translateOptions(this.options).subscribe(options => {
                        observer.next(options.filter((option: any) => option[this.optionLabel].search(new RegExp(term, 'i')) >= 0 || option.isGroup));
                        observer.complete();
                    });
                });
            };

            // Get the previous selected Value
            this.selectedProvider = ids => {
                return new Observable<any>(observer => {
                    // tslint:disable-next-line
                    const selected = this.options.filter((option: any) => ids.find(id => id == option[this.optionValue]));

                    if (selected.length) {
                        // Translate all values
                        this.translateOptions(selected).subscribe(options => {
                            observer.next(options);
                            observer.complete();
                        });
                    } else {
                        observer.next([]);
                        observer.complete();
                    }
                });
            };

            // Map the given data to a form the select-component can work with
            this.iqSelect2ItemAdapter = item => {
                return { id: item[this.optionValue], text: item[this.optionLabel], isGroup: item.isGroup };
            };
        }
    }

    ngOnDestroy(): void {
        if (this.errorSubscription) {
            this.errorSubscription.unsubscribe();
        }
    }

    hasErrors(): boolean {
        return (!this.disableErrors
            && this.selectFormGroup instanceof FormGroup
            && this.selectFormGroup.get(this.selectFormControlName).invalid
            && this.selectFormGroup.get(this.selectFormControlName).touched);
    }

    clearSelection(): void {
        this.selectFormGroup.get(this.selectFormControlName).reset();
        this.selectComponent.removeItem(this.selectFormGroup.get(this.selectFormControlName).value);
    }

    private translateOptions(options: Array<any>): Observable<Array<any>> {
        return new Observable<Array<any>>(observer => {
            if (options && options.length) {
                this.translateService.get(
                    options.reduce(
                        (flat: Array<string>, toFlatten) =>
                            // If there is a translatePrefix given we need to us it to get the correct translation
                            flat.concat(this.translatePrefix + toFlatten[this.optionLabel]),
                        [])
                ).subscribe(res => {
                    observer.next(options.map(item => {
                        // If there is a translatePrefix given we need to us it to get the correct translation
                        item[this.optionLabel] = res[this.translatePrefix + item[this.optionLabel]];
                        return item;
                    }));
                    observer.complete();
                });
            } else {
                observer.next([]);
                observer.complete();
            }
        });
    }
}
