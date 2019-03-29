import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FormErrorService {
  public propertyError = new Subject<{ property_path: string, message: string }>();
  public formError = new Subject<string>();
}
