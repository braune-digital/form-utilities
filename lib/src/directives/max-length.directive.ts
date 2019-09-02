import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener, Inject, Renderer2
} from '@angular/core';
import {FormUtilitiesOptions} from '../form-utilities.module';

@Directive({
  selector: '[bd-maxlength]'
})
export class MaxLengthDirective implements AfterViewInit {

  constructor(@Inject('FormUtilitiesOptions') protected _options:FormUtilitiesOptions, private renderer: Renderer2, private elementRef: ElementRef) {
  }

  public ngAfterViewInit() {
    this.counter();
  }

  @HostListener('input')
  @HostListener('load')
  private counter() {

    const counterDiv = this.renderer.createElement('div');
    this.renderer.addClass(counterDiv, this._options.classFormGroup);

    this.renderer.insertBefore(this.elementRef.nativeElement.parentNode, counterDiv, this.elementRef.nativeElement);

    this.renderer.appendChild(counterDiv, this.elementRef.nativeElement);
  }
}
