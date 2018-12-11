import {Component, Inject, Input} from '@angular/core';
import {FormUtilitiesOptions} from '../../../form-utilities.module';

@Component({
  moduleId: module.id,
  selector: 'bd-form-errors',
  templateUrl: './form-errors.component.html'
})
export class FormErrorsComponent {

  @Input()
  errors: any;

  public constructor(@Inject('options') public _options: FormUtilitiesOptions) {
  }

  get options(): FormUtilitiesOptions {
    return this._options;
  }
}