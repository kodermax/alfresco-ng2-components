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
System.register(['angular2/core', '../services/upload.service', './file-uploading-dialog.component', 'ng2-translate/ng2-translate'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, upload_service_1, file_uploading_dialog_component_1, ng2_translate_1;
    var UploadButtonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (upload_service_1_1) {
                upload_service_1 = upload_service_1_1;
            },
            function (file_uploading_dialog_component_1_1) {
                file_uploading_dialog_component_1 = file_uploading_dialog_component_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            }],
        execute: function() {
            /**
             * <alfresco-upload-button [showDialogUpload]="boolean"
             *                         [showUdoNotificationBar]="boolean"
             *                         [uploadFolders]="boolean"
             *                         [multipleFiles]="boolean"
             *                         [acceptedFilesType]="string">
             * </alfresco-upload-button>
             *
             * This component, provide a set of buttons to upload files to alfresco.
             *
             * @InputParam {boolean} [true] showDialogUpload - hide/show upload dialog.
             * @InputParam {boolean} [true] showUdoNotificationBar - hide/show notification bar.
             * @InputParam {boolean} [false] uploadFolders - allow/disallow upload folders (only for chrome).
             * @InputParam {boolean} [false] multipleFiles - allow/disallow multiple files.
             * @InputParam {string} [*] acceptedFilesType - array of allowed file extensions.
             *
             *
             * @returns {UploadDragAreaComponent} .
             */
            UploadButtonComponent = (function () {
                function UploadButtonComponent(el, translate) {
                    this.el = el;
                    this.showUploadDialog = true;
                    this.showUdoNotificationBar = true;
                    this.uploadFolders = true;
                    this.multipleFiles = false;
                    this.acceptedFilesType = '*';
                    this.filesUploadingList = [];
                    console.log('UploadComponent constructor', el);
                    this._uploaderService = new upload_service_1.UploadService({
                        url: 'http://192.168.99.100:8080/alfresco/service/api/upload',
                        withCredentials: true,
                        authToken: btoa('admin:admin'),
                        authTokenPrefix: 'Basic',
                        fieldName: 'filedata',
                        formFields: {
                            siteid: 'swsdp',
                            containerid: 'documentLibrary'
                        }
                    });
                    this.translationInit(translate);
                }
                /**
                 * Method called when files are dropped in the drag area.
                 *
                 * @param {File[]} files - files dropped in the drag area.
                 */
                UploadButtonComponent.prototype.onFilesAdded = function ($event) {
                    var files = $event.currentTarget.files;
                    if (files.length) {
                        var latestFilesAdded = this._uploaderService.addToQueue(files);
                        this.filesUploadingList = this._uploaderService.getQueue();
                        if (this.showUploadDialog) {
                            this._showDialog();
                        }
                        if (this.showUdoNotificationBar) {
                            this._showUndoNotificationBar(latestFilesAdded);
                        }
                    }
                };
                /**
                 * Show undo notification bar.
                 *
                 * @param {FileModel[]} latestFilesAdded - files in the upload queue enriched with status flag and xhr object.
                 */
                UploadButtonComponent.prototype._showUndoNotificationBar = function (latestFilesAdded) {
                    if (componentHandler) {
                        componentHandler.upgradeAllRegistered();
                    }
                    this.undoNotificationBar.nativeElement.MaterialSnackbar.showSnackbar({
                        message: this.translate.get('FILE_UPLOAD.MESSAGES.PROGRESS').value,
                        timeout: 5000,
                        actionHandler: function () {
                            latestFilesAdded.forEach(function (uploadingFileModel) {
                                uploadingFileModel.setAbort();
                            });
                        },
                        actionText: this.translate.get('FILE_UPLOAD.ACTION.UNDO').value
                    });
                };
                /**
                 * Show the upload dialog.
                 */
                UploadButtonComponent.prototype._showDialog = function () {
                    this.fileUploadingDialogComponent.showDialog();
                };
                /**
                 * Initial configuration for Multi language
                 * @param translate
                 */
                UploadButtonComponent.prototype.translationInit = function (translate) {
                    this.translate = translate;
                    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
                    userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
                    this.translate.setDefaultLang(userLang);
                    this.translate.use(userLang);
                };
                __decorate([
                    core_1.ViewChild('undoNotificationBar'), 
                    __metadata('design:type', Object)
                ], UploadButtonComponent.prototype, "undoNotificationBar", void 0);
                __decorate([
                    core_1.ViewChild('fileUploadingDialog'), 
                    __metadata('design:type', file_uploading_dialog_component_1.FileUploadingDialogComponent)
                ], UploadButtonComponent.prototype, "fileUploadingDialogComponent", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], UploadButtonComponent.prototype, "showUploadDialog", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], UploadButtonComponent.prototype, "showUdoNotificationBar", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], UploadButtonComponent.prototype, "uploadFolders", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], UploadButtonComponent.prototype, "multipleFiles", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], UploadButtonComponent.prototype, "acceptedFilesType", void 0);
                UploadButtonComponent = __decorate([
                    core_1.Component({
                        selector: 'alfresco-upload-button',
                        moduleId: __moduleName,
                        directives: [file_uploading_dialog_component_1.FileUploadingDialogComponent],
                        templateUrl: './upload-button.component.html',
                        styleUrls: ['./upload-button.component.css'],
                        pipes: [ng2_translate_1.TranslatePipe]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, ng2_translate_1.TranslateService])
                ], UploadButtonComponent);
                return UploadButtonComponent;
            }());
            exports_1("UploadButtonComponent", UploadButtonComponent);
        }
    }
});
//# sourceMappingURL=upload-button.component.js.map