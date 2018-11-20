import {Component, Inject, Input} from '@angular/core';
import {FormUtilitiesOptions} from '../../form-utilities.module';

@Component({
  moduleId: module.id,
  selector: 'bd-form-help',
  templateUrl: './form-help.component.html',
  styleUrls: ['./form-help.component.scss']
})
export class FormHelpComponent {

  @Input() label: string;

  public constructor(@Inject('options') public _options: FormUtilitiesOptions) {
  }

}
