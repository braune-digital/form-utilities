import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bd-progress-button',
  templateUrl: './progress-button.component.html',
  styleUrls: ['./progress-button.component.scss']
})
export class ProgressButtonComponent {


  @Input('buttonClass') buttonClass = 'btn-primary';
  @Input('buttonType') buttonType = 'submit';
  @Input('buttonLoading') buttonLoading = false;
  @Input('buttonSuccess') buttonSuccess = false;
  @Input('buttonDisabled') buttonDisabled = false;
  @Input('formErrors') formErrors: Array<any> = [];

  @Output() buttonOnSubmit: EventEmitter<any> = new EventEmitter();

  constructor() {
  }


  onSubmit(): void {
    this.buttonOnSubmit.emit(true);
  }

}
