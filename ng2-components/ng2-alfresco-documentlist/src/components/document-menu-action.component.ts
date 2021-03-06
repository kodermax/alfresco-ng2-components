/*!
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

import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AlfrescoTranslationService, LogService } from 'ng2-alfresco-core';
import { MinimalNodeEntity } from 'alfresco-js-api';

import { DocumentListService } from './../services/document-list.service';
import { ContentActionModel } from './../models/content-action.model';

declare let dialogPolyfill: any;

const ERROR_FOLDER_ALREADY_EXIST = 409;

@Component({
    moduleId: module.id,
    selector: 'alfresco-document-menu-action',
    styleUrls: ['./document-menu-action.component.css'],
    templateUrl: './document-menu-action.component.html'
})
export class DocumentMenuActionComponent {

    @Input()
    folderId: string;

    @Output()
    success = new EventEmitter();

    @Output()
    error = new EventEmitter();

    @ViewChild('dialog')
    dialog: any;

    actions: ContentActionModel[] = [];

    message: string;

    folderName: string = '';

    constructor(private documentListService: DocumentListService,
                private translateService: AlfrescoTranslationService,
                private logService: LogService) {

        if (translateService) {
            translateService.addTranslationFolder('ng2-alfresco-documentlist', 'node_modules/ng2-alfresco-documentlist/src');
        }
    }

    public createFolder(name: string) {
        this.cancel();
        this.documentListService.createFolder(name, this.folderId)
            .subscribe(
                (res: MinimalNodeEntity) => {
                    this.folderName = '';
                    this.logService.info(res.entry);
                    this.success.emit({node: res.entry});
                },
                error => {
                    let errorMessagePlaceholder = this.getErrorMessage(error.response);
                    if (errorMessagePlaceholder) {
                        this.message = this.formatString(errorMessagePlaceholder, [name]);
                        this.error.emit({message: this.message});
                        this.logService.error(this.message);
                    } else {
                        this.error.emit(error);
                        this.logService.error(error);
                    }
                }
            );
    }

    public showDialog() {
        if (!this.dialog.nativeElement.showModal) {
            dialogPolyfill.registerDialog(this.dialog.nativeElement);
        }
        this.dialog.nativeElement.showModal();
    }

    public cancel() {
        if (this.dialog) {
            this.dialog.nativeElement.close();
        }
    }

    /**
     * Retrive the error message using the error status code
     * @param response - object that contain the HTTP response
     * @returns {string}
     */
    private getErrorMessage(response: any): string {
        if (response.body && response.body.error.statusCode === ERROR_FOLDER_ALREADY_EXIST) {
            let errorMessage: any;
            errorMessage = this.translateService.get('FILE_UPLOAD.MESSAGES.FOLDER_ALREADY_EXIST');
            return errorMessage.value;
        }
    }

    /**
     * Replace a placeholder {0} in a message with the input keys
     * @param message - the message that conains the placeholder
     * @param keys - array of value
     * @returns {string} - The message without placeholder
     */
    private formatString(message: string, keys: any []) {
        let i = keys.length;
        while (i--) {
            message = message.replace(new RegExp('\\{' + i + '\\}', 'gm'), keys[i]);
        }
        return message;
    }

    isFolderNameEmpty() {
        return this.folderName === '' ? true : false;
    }
}
