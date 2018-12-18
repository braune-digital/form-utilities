import {Component, Inject, Input} from '@angular/core';
import {FormUtilitiesOptions} from '../../../form-utilities.module';
import {TipsOptions} from '../models';

@Component({
  moduleId: module.id,
  selector: 'bd-form-tips',
  templateUrl: './form-tips.component.html'
})
export class FormTipsComponent {

  @Input()
  tips: Array<TipsOptions>;

  public constructor(@Inject('options') public _options: FormUtilitiesOptions) {
  }

  get options(): FormUtilitiesOptions {
    return this._options;
  }
}
