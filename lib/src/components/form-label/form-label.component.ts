import {Component, Inject, Input} from '@angular/core';
import {FormUtilitiesOptions} from '../../form-utilities.module';

@Component({
  moduleId: module.id,
  selector: 'bd-form-label',
  templateUrl: './form-label.component.html',
  styleUrls: ['./form-label.component.scss']
})
export class FormLabelComponent {

  @Input() label: string;

  public constructor(@Inject('options') public _options: FormUtilitiesOptions) {
  }

  get options(): FormUtilitiesOptions {
    return this._options;
  }
}
