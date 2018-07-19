import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[bdSelect]'
})
export class SelectDirective implements OnInit {

    @Input()
    label: string;

    constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        // Create a div with form-group
        const formGroupDiv = this.renderer.createElement('div');
        this.renderer.addClass(formGroupDiv, 'form-group');

        if (this.label) {
            const label = this.renderer.createElement('label');
            const labelText = this.renderer.createText(this.label);
            this.renderer.addClass(label, 'text-small');
            this.renderer.appendChild(label, labelText);
            this.renderer.appendChild(formGroupDiv, label);
        }

        this.renderer.insertBefore(this.elementRef.nativeElement.parentNode, formGroupDiv, this.elementRef.nativeElement);

        this.renderer.appendChild(formGroupDiv, this.elementRef.nativeElement);
    }
}
