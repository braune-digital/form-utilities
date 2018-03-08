import { Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { FormErrorService } from '../services/form-error.service';

export abstract class FormInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  static readonly REMOTE_ERROR_PREFIX = 'remote_';

  abstract input: ControlValueAccessor;
  abstract formErrorService: FormErrorService;

  @Input()
  label: string;

  @Input()
  placeholder: string;

  @Input()
  disableErrors = false;

  @Input()
  formControl: FormControl;

  formErrorServiceSubscription: Subscription;

  ngOnInit(): void {
    // Tell the
    this.formErrorServiceSubscription = this.formErrorService.propertyError.subscribe(error => {
      // todo - @Jannik - do not set this on every control
      // todo - Maybe use a custom formBuilder and register the parent form on the formErrorService
      // todo - For performance use onPush-strategy if above solution is not yet implemented
      const control = this.formControl.root.get(error.property_path);
      const errorKey = this.getErrorKey(error.property_path);
      if (!control.hasError(errorKey)) {
        // console.log(this.formControl.root, error.property_path, control, {...control.errors, remote_error: error.message});
        control.setErrors({...control.errors, [errorKey]: error.message});
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
