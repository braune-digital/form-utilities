import { Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { FormErrorService } from '../services/form-error.service';
import { FormUtilitiesOptions } from '../form-utilities.module';

export abstract class FormInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  static readonly REMOTE_ERROR_PREFIX = 'remote_';
  static readonly ERROR_PREFIX = 'form.errors';

  abstract input: ControlValueAccessor;
  abstract formErrorService: FormErrorService;

  abstract label: string;
  abstract placeholder: string;
  abstract formControl: FormControl;

  formErrorServiceSubscription: Subscription;

  @Input() displayErrors = false;

  get errors(): Array<string> {
    if (
      (this._options.displayErrors || this.displayErrors)
      && this.formControl
      && !this.formControl.pristine
      && this.formControl.errors
    ) {
      return Object.keys(this.formControl.errors).map(key => FormInputComponent.ERROR_PREFIX + '.' + key);
    }
    return [];
  }


  protected constructor(@Inject('options') private _options: FormUtilitiesOptions) {
  }

  ngOnInit(): void {
    // Tell the
    this.formErrorServiceSubscription = this.formErrorService.propertyError.subscribe(error => {
      // todo - @Jannik - do not set this on every control
      // todo - Maybe use a custom formBuilder and register the parent form on the formErrorService
      // todo - For performance use onPush-strategy if above solution is not yet implemented
      if (this.formControl && this.formControl.root) {
        const control = this.formControl.root.get(error.property_path);
        const errorKey = this.getErrorKey(error.property_path);
        if (!control.hasError(errorKey)) {
          control.setErrors({...control.errors, [errorKey]: error.message});
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.formErrorServiceSubscription.unsubscribe();
  }

  writeValue(value: any): void {
    this.input.writeValue(value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.input.registerOnChange(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.input.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.input.setDisabledState(isDisabled);
  }

  private getErrorKey(propertyPath: string): string {
    return FormInputComponent.REMOTE_ERROR_PREFIX + propertyPath.split('.').pop();
  }
}
