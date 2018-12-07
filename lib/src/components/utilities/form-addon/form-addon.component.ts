import {Component, HostBinding, Inject, Input} from '@angular/core';
import {FormUtilitiesOptions} from '../../../form-utilities.module';

@Component({
  moduleId: module.id,
  selector: 'bd-form-addon',
  templateUrl: './form-addon.component.html',
})
export class FormAddonComponent {

  @Input()
  text: string;

  @Input()
  position: string;

  @HostBinding('class')
  get hostClasses(): string {
    return this.position === 'prepend' ? this.options.classFormInputGroupPrepend : this.options.classFormInputGroupAppend;
  }

  public constructor(@Inject('options') public _options: FormUtilitiesOptions) {
  }

  get options(): FormUtilitiesOptions {
    return this._options;
  }
}
