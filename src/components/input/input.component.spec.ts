import { Component, DebugElement } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { UtilsModule } from '../../../utils/utils.module';
import { ComponentsModule } from '../../components.module';
import { HttpModule } from '@angular/http';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


export function main() {

    describe('InputComponent', () => {

        const config: Route[] = [];
        let component: any;
        let fixture: ComponentFixture<any>;
        let debugElem: DebugElement;
        let nativeElem: HTMLElement;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComponentsModule.forRoot(), UtilsModule.forRoot(), ReactiveFormsModule, FormsModule, HttpModule, RouterTestingModule.withRoutes(config)],
                declarations: [TestInputComponent],
                providers: [
                    { provide: APP_BASE_HREF, useValue: '/' }
                ]
            }).compileComponents();
        }));

        // create the component before each of the tests
        beforeEach(() => {
            fixture = TestBed.createComponent(TestInputComponent);
            component = fixture.componentInstance;

            debugElem = fixture.debugElement;

            // initial setup
            component.inputClass = 'form-test';
            component.inputType = 'password';
            component.inputDisabled = false;
            component.fuPlaceholser = 'Test';
            component.inputErrors = [];

            fixture.detectChanges();
        });

        it('should build without a problem', () => {
            expect(component).toBeDefined();
        });

        it('should set the disabled attribute when asked to', () => {
            component.inputDisabled = true;
            fixture.detectChanges();
            /*expect(
                debugElem.query(By.css('input')).nativeElement.attributes.getNamedItem('disabled')
            ).toBeTruthy();*/
        });
    });
}

@Component({
    selector: 'test-cmp',
    template: '<input-component [inputFormGroup]="form" inputFormControlName="test"></input-component>'
})
class TestInputComponent {

    public form: FormGroup = new FormGroup({
        test: new FormControl('', Validators.required)
    });
}



