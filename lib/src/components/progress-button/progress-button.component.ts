import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bd-progress-button',
  templateUrl: './progress-button.component.html',
  styleUrls: ['./progress-button.component.scss']
})
export class ProgressButtonComponent {

  @Input() btnClass = 'btn-primary';
  @Input() btnType = 'button';
  @Input() btnTargetForm = null;
  @Input() btnStateLoading = false;
  @Input() btnStateSuccess = false;
  @Input() btnDisabled = false;
  @Output('clicked') clicked: EventEmitter<null> = new EventEmitter();
}
