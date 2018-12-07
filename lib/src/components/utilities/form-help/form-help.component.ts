import {Component, Inject, Input} from '@angular/core';
import {FormUtilitiesOptions} from '../../../form-utilities.module';

@Component({
  moduleId: module.id,
  selector: 'bd-form-help',
  templateUrl: './form-help.component.html'
})
export class FormHelpComponent {

  @Input()
  label: string;

  public constructor(@Inject('options') public _options: FormUtilitiesOptions) {
  }

  get options(): FormUtilitiesOptions {
    return this._options;
  }
}
