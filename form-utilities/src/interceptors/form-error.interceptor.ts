import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/do'
import { Observable } from 'rxjs/Observable';
import { FormErrorService } from '../services';

@Injectable()
export class FormErrorInterceptor implements HttpInterceptor {

    constructor(private formErrorService: FormErrorService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do(() => {
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 400) {
                    const errorObject = err.error;
                    if (errorObject.errors && errorObject.errors.children) {
                        const objectKeys = Object.keys(errorObject.errors.children);
                        objectKeys.forEach((key) => {
                            const property = errorObject.errors.children[key];
                            if (property.errors && property.errors.length > 0) {
                                property.errors.forEach((message: any) => {
                                    this.formErrorService.propertyError.next({property_path: key, message: message});
                                });
                            }
                        });
                    }
                }
            }
        });
    }
}