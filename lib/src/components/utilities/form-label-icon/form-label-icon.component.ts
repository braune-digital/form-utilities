import {Component, Inject, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bd-form-label-icon',
  templateUrl: './form-label-icon.component.html'
})
export class FormLabelIconComponent {

  @Input('icon')
  icon: string = null;

  @Input('font')
  font = 'far';
}
