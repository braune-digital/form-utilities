import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: '<password-meter>',
    templateUrl: 'password-meter.component.html',
})
export class PasswordMeterComponent {

    @Input() passwordField: string;
    @Input() form: FormGroup;
    @Output() onPasswordValid = new EventEmitter<string>();

    passwordValid(): boolean {
        if (this.form.get(this.passwordField).valid) {
            this.onPasswordValid.emit('valid');
        }
        return this.form.get(this.passwordField).valid;
    }

    passwordGood(): boolean {
        return this.passwordValid() && this.form.value[this.passwordField].length >= 10;
    }

    passwordPerfect(): boolean {
        return this.passwordValid() && this.form.value[this.passwordField].length >= 12;
    }
}
