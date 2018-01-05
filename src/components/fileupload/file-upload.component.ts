import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { FormControl, FormGroup } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { ApiRequestService } from '../../utils/abstracts/abstract-api-request.service';

@Component({
    moduleId: module.id,
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html'
})
export class FileUploadComponent implements OnInit {

    @Input('uploaderClass') uploaderClass: string;
    @Input('uploaderPlaceholder') uploaderPlaceholder: string;
    @Input('uploaderTooltip') uploaderTooltip: string;

    @Input('uploaderUrl') uploaderUrl: string;

    @Input() uploaderFormControlName = 'defaultControl';
    @Input() uploaderFormGroup: FormGroup = new FormGroup({ [this.uploaderFormControlName]: new FormControl([]) });

    @Input() multiple = false;
    @Input() fullWidth = false;
    @Input() fileNameLength = 15;

    @Input() authToken: string;

    @Output('onError') onError: EventEmitter<string> = new EventEmitter();
    @Output('onSuccess') onSuccess: EventEmitter<string> = new EventEmitter();

    uploader: FileUploader;
    dropZoneOver = false;
    errors: { [key: string]: string } = {};

    constructor(private api: ApiRequestService, private changeDetector: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        this.uploader = new FileUploader({
            url: this.api.baseUrl() + this.uploaderUrl,
            authToken: 'Bearer ' + this.authToken,
            method: 'post',
            autoUpload: true
        });

        // to get a real progress
        this.uploader.onProgressItem = () => this.changeDetector.detectChanges();

        // handle upload errors
        this.uploader.onErrorItem = (item: FileItem, response: string) => {
            this.errors[item.file.name] = JSON.parse(response).message;
            this.onError.emit(response);
        };
        this.uploader.onSuccessItem = (item: FileItem, response: string) => {
            const content = JSON.parse(response);
            const control = this.uploaderFormGroup.get(this.uploaderFormControlName);
            this.errors[item.file.name] = null;
            this.onSuccess.emit(response);
            if (Array.isArray(control.value)) {
                control.setValue(control.value.concat({ id: content.id, name: content.name }));
            } else {
                control.setValue([{ id: content.id, name: content.name }]);
            }
            if (control.pristine || control.untouched) {
                control.markAsTouched();
                control.markAsDirty();
            }
            control.updateValueAndValidity();
            this.uploader.removeFromQueue(item);
        };
    }

    removeItem(item: FileItem): void {
        this.uploader.removeFromQueue(item);
    }

    removeFile(item: any): void { // todo
        const control = this.uploaderFormGroup.get(this.uploaderFormControlName);
        control.setValue(control.value.filter((file: any) => item.id !== file.id));
        control.updateValueAndValidity();
    }

    getTruncatedFilename(name: string): string {
        // return if no truncation is needed
        if (name.length <= this.fileNameLength) {
            return name;
        }

        // split string in parts separated by '.'
        const parts = name.split('.');

        // get the file ending
        const fileEnding = '.' + parts.pop();

        // rejoin the filename without file-extension
        const fileName = parts.join('.');

        // crop the string, append dots and the file-extension
        const slicePipe = new SlicePipe();

        return slicePipe.transform(fileName, 0, (this.fileNameLength - (fileEnding.length + 3)) / 2)
            // dots
            + '...'
            // ed of string
            + slicePipe.transform(fileName, -(this.fileNameLength - (fileEnding.length + 3)) / 2)
            // file-extension
            + fileEnding;
    }

    getLastItem(): FileItem {
        return this.uploader.queue[this.uploader.queue.length - 1];
    }

    hasError(): boolean {
        return !!Object.keys(this.errors).length;
    }

    downloadLink(mediaId: number): string {
        return this.api.baseUrl() + 'assets/download/' + mediaId + '?bearer=' + this.authToken;
    }
}
