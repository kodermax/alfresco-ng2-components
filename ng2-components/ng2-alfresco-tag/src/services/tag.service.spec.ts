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

/*
import { describe, expect, it, inject, beforeEachProviders, beforeEach, afterEach } from '@angular/core/testing';
import { AlfrescoAuthenticationService, AlfrescoSettingsService, AlfrescoApiService } from 'ng2-alfresco-core';
import { TagService } from './tag.service';

declare let jasmine: any;

describe('Tag service', () => {

    let service;

    beforeEachProviders(() => {

        return [
            AlfrescoSettingsService,
            AlfrescoAuthenticationService,
            AlfrescoApiService,
            TagService
        ];
    });

    beforeEach(inject([TagService], (tagService: TagService) => {
        service = tagService;
    }));

    describe('Content tests', () => {

        beforeEach(() => {
            jasmine.Ajax.install();
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it('removeTag should perform a call against the server', (done) => {
            service.removeTag('fake-node-id', 'fake-tag').subscribe(() => {
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('DELETE');
                expect(jasmine.Ajax.requests.mostRecent().url)
                    .toBe('http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/fake-node-id/tags/fake-tag');
                done();
            });

            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 200
            });
        });

        it('addTag should perform a call against the server', (done) => {
            service.addTag('fake-node-id', 'fake-tag').subscribe(() => {
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
                expect(jasmine.Ajax.requests.mostRecent().url)
                    .toBe('http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/fake-node-id/tags');
                done();
            });

            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 200
            });
        });

        it('getAllTheTags should perform a call against the server', (done) => {
            service.getAllTheTags('fake-node-id', 'fake-tag').subscribe(() => {
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
                expect(jasmine.Ajax.requests.mostRecent().url)
                    .toBe('http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/tags');
                done();
            });

            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 200
            });
        });

        it('getTagsByNodeId should perform a call against the server', (done) => {
            service.getTagsByNodeId('fake-node-id', 'fake-tag').subscribe(() => {
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
                expect(jasmine.Ajax.requests.mostRecent().url)
                    .toBe('http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/fake-node-id/tags');
                done();
            });

            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 200
            });
        });

        it('getTagsByNodeId catch errors call', (done) => {
            service.getTagsByNodeId('fake-node-id', 'fake-tag').subscribe(() => {
            }, () => {
                done();
            });

            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 403
            });
        });
    });
});
*/
