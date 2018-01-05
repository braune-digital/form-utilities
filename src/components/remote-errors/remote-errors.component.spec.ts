import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RemoteErrors } from './remote-errors.component';

export function main() {

    describe('RemoteErrors', () => {

        const config: Route[] = [];
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, RouterTestingModule.withRoutes(config)],
                declarations: [TestRemoteErrors, RemoteErrors],
                providers: [
                    { provide: APP_BASE_HREF, useValue: '/' }
                ]
            });
        });

        it('should build without a problem',
            async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        const fixture = TestBed.createComponent(TestRemoteErrors);
                        const compiled = fixture.nativeElement;

                        expect(compiled).toBeTruthy();
                    });
            }));
    });
}

@Component({
    selector: 'test-cmp',
    template: '<remote-errors></remote-errors>'
})

class TestRemoteErrors {
}



