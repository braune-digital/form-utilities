import {Component, Inject, Input} from '@angular/core';
import {FormUtilitiesOptions} from '../../../form-utilities.module';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  selector: 'bd-form-required',
  templateUrl: './form-required.component.html'
})
export class FormRequiredComponent {

  @Input() required: boolean;

  public constructor(
    @Inject('options') public _options: FormUtilitiesOptions,
    private _sanitizer: DomSanitizer
  ) {
  }

  get options(): FormUtilitiesOptions {
    return this._options;
  }

  get requiredString(): any {
    return this._sanitizer.bypassSecurityTrustHtml(this.options.requiredString);
  }
}
