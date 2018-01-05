import { Http, Response, Headers } from '@angular/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Subject } from 'rxjs/Subject';

export abstract class ApiRequestService {
    abstract headers: Headers = new Headers();
    abstract http: Http;
    abstract propertyError: Subject<object>;
    baseUrl(withApiPrefix: boolean = true): string { return '' };
    buildHeaders(withScope: boolean = true): void  {};
    abstract handleError(error: Response | any): ErrorObservable;
}
