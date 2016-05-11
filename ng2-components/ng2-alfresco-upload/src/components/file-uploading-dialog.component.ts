/**
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import {Component, ElementRef, Input} from 'angular2/core';
import {FileModel} from '../models/file.model';
import {FileUploadingListComponent} from './file-uploading-list.component';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

declare let __moduleName: string;

/**
 * <file-uploading-dialog [filesUploadingList]="FileModel[]" ></file-uploading-dialog>
 *
 * This component is a hideable and minimizable wich contains the list of the uploading
 * files contained in the filesUploadingList.
 *
 * @InputParam {FileModel[]} filesUploadingList - list of the uploading files .
 *
 *
 * @returns {FileUploadingDialogComponent} .
 */
@Component({
    selector: 'file-uploading-dialog',
    moduleId: __moduleName,
    directives: [FileUploadingListComponent],
    templateUrl: './file-uploading-dialog.component.html',
    styleUrls: ['./file-uploading-dialog.component.css'],
    host: {'[class.dialog-show]': 'toggleShowDialog'},
    pipes: [TranslatePipe]
})
export class FileUploadingDialogComponent {

    @Input()
    filesUploadingList: FileModel [];

    private _isDialogActive: boolean = false;

    private _isDialogMinimized: boolean = false;

    constructor(public el: ElementRef) {
        console.log('FileUploadingDialogComponent constructor', el);
    }

    /**
     * Display and hide the dialog component.
     */
    toggleShowDialog($event) {
        this._isDialogActive = !this._isDialogActive;
    }

    /**
     * Display the dialog if hidden.
     */
    showDialog() {
        this._isDialogActive = true;
    }

    /**
     * Minimize and expand the dialog component.
     */
    toggleDialogMinimize($event) {
        this._isDialogMinimized = !this._isDialogMinimized;
    }
}