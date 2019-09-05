import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { FormErrorService } from '../services/form-error.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class FormErrorInterceptor implements HttpInterceptor {

  constructor(private formErrorService: FormErrorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(() => {
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 400) {
              const errorObject = err.error;
              if (errorObject.errors && errorObject.errors.children) {
                const flattedErrors = this.flatten(errorObject.errors);
                const get = (p, o) =>
                  p.reduce((xs, x) =>
                    (xs && xs[x]) ? xs[x] : null, o);

                Object.keys(flattedErrors).forEach(propertyPath => {
                  /**
                   * Remove .i from path
                   */
                  const splitted = propertyPath.split('.');
                  splitted.pop();
                  const pp = splitted.filter(_ => {
                    return _ !== 'errors' && _ !== 'children';
                  });
                  this.formErrorService.propertyError.next({property_path: pp.join('.'), message: get(propertyPath.split('.'), errorObject.errors)});
                });
              }
            }
          }
        }
      )
    );
  }

  /**
   * @param object
   * @param path
   * @param res
   */
  flatten(object, path = '', res = undefined) {
    if (!Array.isArray(res)) {
      res = [];
    }
    if (object !== null && typeof object === 'object') {
      if (Array.isArray(object)) {
        for (let i = 0; i < object.length; i++) {
          this.flatten(object[i], path + '.' + i , res)
        }
      } else {
        const keys = Object.keys(object);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          this.flatten(object[key], path ? path + '.' + key : key, res)
        }
      }
    } else {
      if (path) {
        res[path] = object
      }
    }
    return res
  }
}
