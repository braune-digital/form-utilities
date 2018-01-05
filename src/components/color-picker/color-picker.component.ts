import { Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {InputComponent} from '../input/input.component';
import { ApiRequestService } from '../../utils/abstracts/abstract-api-request.service';

@Component({
    moduleId: module.id,
    selector: 'color-picker-component',
    templateUrl: 'color-picker.component.html',
})
export class ColorPickerComponent extends InputComponent {

    color: string = '';

    constructor(protected api: ApiRequestService, protected translate: TranslateService) {
        super(api, translate);

    }

    ngOnInit(): void {
        this.color = this.inputFormGroup.get(this.inputFormControlName).value;
    }

    /**
     *
     * @param color
     */
    handleColorChange(color: string): void {
        this.inputFormGroup.get(this.inputFormControlName).setValue(color);
    }

}
