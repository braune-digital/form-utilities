import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { FormErrorService } from '../services/form-error.service';

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
            this.walkRecursive(errorObject.errors.children, []);
          }
        }
      }
    });
  }

  /**
   * @param children
   * @param keys
   */
  walkRecursive(children: any, keys: string[]): void {
    const objectKeys = Object.keys(children);
    objectKeys.forEach((key) => {
      const property = children[key];
      if (property.errors && property.errors.length > 0) {
        property.errors.forEach((message: any) => {
          const path = (keys.length) ? keys.join('.') + '.' + key : key;
          this.formErrorService.propertyError.next({property_path: path, message: message});
        });
      }

      keys.push(key);
      if (property.children) {
        this.walkRecursive(property.children, keys);
      } else {
        keys.splice(keys.length - 1, 1);
      }
    });
  }
}
