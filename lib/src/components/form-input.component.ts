import { Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { FormErrorService } from '../services/form-error.service';
import { FormUtilitiesOptions } from '../form-utilities.module';
import {TipsOptions} from './utilities/models';
import { Subscription } from 'rxjs';

export abstract class FormInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  static readonly REMOTE_ERROR_PREFIX = 'remote_';
  static readonly ERROR_PREFIX = 'form.errors';

  abstract input: ControlValueAccessor;
  abstract formErrorService: FormErrorService;

  abstract label: string;
  abstract placeholder: string;
  abstract formControl: FormControl;

  formErrorServiceSubscription: Subscription;

  @Input()
  public displayErrors = false;

  @Input()
  public ignoreTouchedForErrors = false;

  @Input()
  public requiredMarker = false;

  @Input()
  public optionsOverride: FormUtilitiesOptions;

  @Input()
  public options: FormUtilitiesOptions;

  @Input()
  tips: Array<TipsOptions>;

  @Input()
  help: string;

  @Input()
  maxLength: number;

  @Input()
  append: string;

  @Input()
  prepend: string;

  @Input()
  disabled = false;

  uniqueId =  '_' + Math.random().toString(36).substr(2, 9);

  private _focus: boolean;

  get errors(): Array<string> {
    let errors = [];
    if (
      (this.options.displayErrors || this.displayErrors)
      && this.formControl
      && (this.formControl.touched || this.ignoreTouchedForErrors)
      && this.formControl.errors
    ) {
      return Object.keys(this.formControl.errors).map(key => {
        // If error is a remote error take the message directly
        if (key.substr(0, FormInputComponent.REMOTE_ERROR_PREFIX.length) == FormInputComponent.REMOTE_ERROR_PREFIX) {
          return this.formControl.errors[key];
        }
        return FormInputComponent.ERROR_PREFIX + '.' + key;
      });
    }
    return [];
  }


  protected constructor(@Inject('FormUtilitiesOptions') protected _options: FormUtilitiesOptions) {
    this.options = Object.assign({}, _options);
  }

  ngOnInit(): void {

    /**
     * Override default options
     */
    Object.assign(this.options, this.optionsOverride);

    /**
     * Subscribe to form errors
     */
    this.formErrorServiceSubscription = this.formErrorService.propertyError.subscribe(error => {
      if (this.formControl && this.formControl.root) {
        const control = this.formControl.root.get(error.property_path);
        const errorKey = this.getErrorKey(error.property_path);
        if (control && !control.hasError(errorKey)) {
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

  get inputGroupClass(): string {
    if (this.prepend) {
      return this.options.classFormInputGroup + ' ' + this.options.classFormInputGroup + '--prepend';
    }
    if (this.append) {
      return this.options.classFormInputGroup + ' ' + this.options.classFormInputGroup + '--append';
    }
    return '';
  }

  private getErrorKey(propertyPath: string): string {
    return FormInputComponent.REMOTE_ERROR_PREFIX + propertyPath.split('.').pop();
  }

  get focus(): boolean {
    return this._focus;
  }

  set focus(value: boolean) {
    this._focus = value;
  }
}
