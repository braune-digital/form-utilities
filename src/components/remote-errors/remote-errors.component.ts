import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: '<remote-errors>',
    templateUrl: 'remote-errors.component.html',
})
export class RemoteErrors {

    @Input('errors') errors: Array<any>;

    constructor() {
    }

}
