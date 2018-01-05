import { Component, DebugElement } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PasswordMeterComponent } from './passwort-meter.component';
import { By } from '@angular/platform-browser';

export function main() {

    describe('PasswordMeterComponent', () => {

        let component: PasswordMeterComponent;
        let fixture: ComponentFixture<PasswordMeterComponent>;
        let debugElems: DebugElement[];

        const fb = new FormBuilder;
        const form = fb.group({
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(/[a-z]/),
                Validators.pattern(/[A-Z]/),
                Validators.pattern(/[0-9]/),
                Validators.pattern(/[@!§$%&/{}\(\)\[\]=?\*+#<>|,;.:\-_]/)
            ]]
        });

        const config: Route[] = [];

        // compile the component aka make it inline
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, RouterTestingModule.withRoutes(config)],
                declarations: [TestPasswordMeterComponent, PasswordMeterComponent],
                providers: [
                    { provide: APP_BASE_HREF, useValue: '/' }
                ]
            }).compileComponents();
        }));

        // create the component before each of the tests
        beforeEach(() => {
            fixture = TestBed.createComponent(PasswordMeterComponent);
            component = fixture.componentInstance;

            // initial setup
            component.passwordField = 'password';
            component.form = form;
            fixture.detectChanges();
        });

        it('should build without a problem', () => {
            expect(component).toBeDefined();
        });

        it('should reject empty passwords', () => {
            debugElems = fixture.debugElement.queryAll(By.css('.item-warn, .item-success'));

            form.setValue({ password: '' });
            fixture.detectChanges();

            debugElems.forEach((debugElem) => {
                expect(debugElem.nativeElement.classList).not.toContain('item-active');
            });
        });

        it('should raise event when password is valid', () => {
            let valid = false;
            component.onPasswordValid.subscribe((result: boolean) => valid = result);

            form.setValue({ password: 'aA1$_678' });
            fixture.detectChanges();

            expect(valid).toBeTruthy();
        });

        it('should mark valid passwords as valid but not as good', () => {
            form.setValue({ password: 'aA1$_678' });
            fixture.detectChanges();

            // show the yellows
            fixture.debugElement.queryAll(By.css('.item-warn'))
                .forEach((debugElem) => {
                    expect(debugElem.nativeElement.classList).toContain('item-active');
                });

            // do not show the green bars
            fixture.debugElement.queryAll(By.css('.item-success'))
                .forEach((debugElem) => {
                    expect(debugElem.nativeElement.classList).not.toContain('item-active');
                });
        });

        it('should mark good passwords as good but not as perfect', () => {
            form.setValue({ password: 'aA1$_667891' });
            fixture.detectChanges();

            // show the yellows
            fixture.debugElement.queryAll(By.css('.item-warn'))
                .forEach((debugElem) => {
                    expect(debugElem.nativeElement.classList).toContain('item-active');
                });

            // do not show the green bars
            debugElems = fixture.debugElement.queryAll(By.css('.item-success'));

            expect(debugElems[0].nativeElement.classList).toContain('item-active');
            expect(debugElems[1].nativeElement.classList).not.toContain('item-active');
        });

        it('should mark perfect passwords as perfect', () => {
            debugElems = fixture.debugElement.queryAll(By.css('.item-warn, .item-success'));

            form.setValue({ password: 'aA1$_123456789' });
            fixture.detectChanges();

            debugElems.forEach((debugElem) => {
                expect(debugElem.nativeElement.classList).toContain('item-active');
            });
        });
    });
}

@Component({
    selector: 'test-cmp',
    template: '<password-meter></password-meter>'
})

class TestPasswordMeterComponent {
}



