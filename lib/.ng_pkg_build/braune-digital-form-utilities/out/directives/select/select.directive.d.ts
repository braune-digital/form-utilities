import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormUtilitiesOptions } from '../../form-utilities.module';
export declare class SelectDirective implements OnInit {
    protected _options: FormUtilitiesOptions;
    private renderer;
    private elementRef;
    label: string;
    constructor(_options: FormUtilitiesOptions, renderer: Renderer2, elementRef: ElementRef);
    ngOnInit(): void;
}
