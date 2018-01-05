import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: '<button-progress>',
  templateUrl: 'button-progress.component.html',
  styleUrls: ['button-progress.component.scss']
})
export class ButtonProgressComponent{


  @Input('buttonClass') buttonClass = 'btn-primary';
  @Input('buttonType') buttonType = 'submit';
  @Input('buttonLoading') buttonLoading = false;
  @Input('buttonSuccess') buttonSuccess = false;
  @Input('buttonDisabled') buttonDisabled = false;
  @Input('formErrors') formErrors: Array<any> = [];

  @Output() buttonOnSubmit: EventEmitter<any> = new EventEmitter();

  constructor() {}


  onSubmit(): void {
    this.buttonOnSubmit.emit(true);
  }

}
