import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { FormErrorService } from '../services/form-error.service';
export declare class FormErrorInterceptor implements HttpInterceptor {
    private formErrorService;
    constructor(formErrorService: FormErrorService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
