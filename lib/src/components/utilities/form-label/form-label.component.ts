import {Component, Inject, Input} from '@angular/core';
import {FormUtilitiesOptions} from '../../../form-utilities.module';

@Component({
  moduleId: module.id,
  selector: 'bd-form-label',
  templateUrl: './form-label.component.html'
})
export class FormLabelComponent {

  @Input()
  label: string;

  @Input()
  inputId: string;

  public constructor(@Inject('FormUtilitiesOptions') public _options: FormUtilitiesOptions) {
  }

  get options(): FormUtilitiesOptions {
    return this._options;
  }
}
