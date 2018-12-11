import { Subject } from 'rxjs/Subject';
export declare class FormErrorService {
    propertyError: Subject<{
        property_path: string;
        message: string;
    }>;
    formError: Subject<string>;
}
