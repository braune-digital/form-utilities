import {Component, Inject, Input} from '@angular/core';
import {FormUtilitiesOptions} from '../../../form-utilities.module';
import {FormControl} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'bd-form-counter',
  templateUrl: './form-counter.component.html'
})
export class FormCounterComponent {

  @Input()
  maxLength: number;

  @Input()
  form: FormControl;

  public constructor(@Inject('options') public _options: FormUtilitiesOptions) {
  }

  get options(): FormUtilitiesOptions {
    return this._options;
  }

  public getMaxLengthLabel() {
    let value = this.form.value;
    if(value === null || value === 'undefined'){
      value = '';
    }
    const length = this.maxLength - String(value).length;
    return this._options.maxLengthString.replace('%s', length.toString());
  }
}
