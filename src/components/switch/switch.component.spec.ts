import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { UtilsModule } from '../../../utils/utils.module';
import { ComponentsModule } from '../../components.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

export function main() {

    describe('SwitchComponent', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BrowserModule, HttpModule, ComponentsModule.forRoot(), UtilsModule.forRoot(), FormsModule, RouterTestingModule.withRoutes([])],
                declarations: [TestSwitchComponent],

            });
        });

        it('should build without a problem',
            async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        const fixture = TestBed.createComponent(TestSwitchComponent);
                        const compiled = fixture.nativeElement;
                        expect(compiled).toBeTruthy();
                    });
            }));
    });
}

@Component({
    selector: 'test-cmp',
    template: '<switch-component></switch-component>'
})
class TestSwitchComponent {
}



