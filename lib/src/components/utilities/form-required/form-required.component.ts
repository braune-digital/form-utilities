import {Component, Inject, Input} from '@angular/core';
import {FormUtilitiesOptions} from '../../../form-utilities.module';

@Component({
  moduleId: module.id,
  selector: 'bd-form-required',
  templateUrl: './form-required.component.html'
})
export class FormRequiredComponent {

  @Input() required: boolean;

  public constructor(@Inject('options') public _options: FormUtilitiesOptions) {
  }

  get options(): FormUtilitiesOptions {
    return this._options;
  }
}
