import { Directive, ElementRef, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { FormUtilitiesOptions } from '../../form-utilities.module';

@Directive({
  selector: '[bdSelect]'
})
export class SelectDirective implements OnInit {

  @Input()
  label: string;

  constructor(@Inject('FormUtilitiesOptions') protected _options:FormUtilitiesOptions, private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    // Create a div with form-group
    const formGroupDiv = this.renderer.createElement('div');
    this.renderer.addClass(formGroupDiv, this._options.classFormGroup);

    if (this.label) {
      const label = this.renderer.createElement('label');
      const labelText = this.renderer.createText(this.label);
      this.renderer.addClass(label, this._options.classFormLabel);
      this.renderer.appendChild(label, labelText);
      this.renderer.appendChild(formGroupDiv, label);
    }

    this.renderer.insertBefore(this.elementRef.nativeElement.parentNode, formGroupDiv, this.elementRef.nativeElement);

    this.renderer.appendChild(formGroupDiv, this.elementRef.nativeElement);
  }
}
