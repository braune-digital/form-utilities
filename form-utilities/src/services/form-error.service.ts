import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FormErrorService {
    public propertyError = new Subject<{ property_path: string, message: string }>();
}