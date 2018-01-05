import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiRequestService } from '../utils/abstracts/abstract-api-request.service';
import { ApiRequestServiceInterface } from '../utils/interfaces/api-request-service.interface';
import { Subject } from 'rxjs/Subject';

export class ApiRequestServiceFaker extends ApiRequestService implements ApiRequestServiceInterface{
    headers: Headers = new Headers();
    http: Http;
    propertyError: Subject<object> = new Subject();
    baseUrl(withApiPrefix: boolean = true): string { return '' };
    buildHeaders(withScope: boolean  = true): void {}
    handleError(error: Response | any): ErrorObservable { return Observable.throw('')}
}