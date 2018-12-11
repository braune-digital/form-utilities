import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { FormUtilitiesOptions } from '../form-utilities.module';
export declare class MaxLengthDirective implements AfterViewInit {
    protected _options: FormUtilitiesOptions;
    private renderer;
    private elementRef;
    constructor(_options: FormUtilitiesOptions, renderer: Renderer2, elementRef: ElementRef);
    ngAfterViewInit(): void;
    private counter();
}
