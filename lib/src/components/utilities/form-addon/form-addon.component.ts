import {Component, HostBinding, Inject, Input} from '@angular/core';
import {FormUtilitiesOptions} from '../../../form-utilities.module';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
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

  public constructor(
    @Inject('FormUtilitiesOptions') public _options: FormUtilitiesOptions,
    private _sanitizer: DomSanitizer
  ) {
  }

  get options(): FormUtilitiesOptions {
    return this._options;
  }

  get addonString(): any {
    return this._sanitizer.bypassSecurityTrustHtml(this.text);
  }
}
