/**
 * Automation API provider
 * Automation provides template of this description, and anyone may modify it in your own project.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { AttachmentDTO } from '../model/attachmentDTO';
import { AttachmentTypeDTO } from '../model/attachmentTypeDTO';
import { PageInfoOfAttachmentDTO } from '../model/pageInfoOfAttachmentDTO';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class AttachmentService {

    protected basePath = 'https://localhost:10048';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * deleteAttachment
     * 
     * @param attachmentId attachmentId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteAttachmentUsingGET(attachmentId: string, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public deleteAttachmentUsingGET(attachmentId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public deleteAttachmentUsingGET(attachmentId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public deleteAttachmentUsingGET(attachmentId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (attachmentId === null || attachmentId === undefined) {
            throw new Error('Required parameter attachmentId was null or undefined when calling deleteAttachmentUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (attachmentId !== undefined && attachmentId !== null) {
            queryParameters = queryParameters.set('attachmentId', <any>attachmentId);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<boolean>(`${this.basePath}/working-portal/attachment/delete_attachment`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * downloadAttachments
     * 
     * @param attachmentId attachmentId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public downloadAttachmentsUsingGET(attachmentId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public downloadAttachmentsUsingGET(attachmentId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public downloadAttachmentsUsingGET(attachmentId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public downloadAttachmentsUsingGET(attachmentId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (attachmentId === null || attachmentId === undefined) {
            throw new Error('Required parameter attachmentId was null or undefined when calling downloadAttachmentsUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (attachmentId !== undefined && attachmentId !== null) {
            queryParameters = queryParameters.set('attachmentId', <any>attachmentId);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/working-portal/attachment/download_attachments`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * findAttachmentByBusinessCaseIds
     * 
     * @param businessCaseId businessCaseId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAttachmentByBusinessCaseIdsUsingGET(businessCaseId: string, observe?: 'body', reportProgress?: boolean): Observable<Array<AttachmentDTO>>;
    public findAttachmentByBusinessCaseIdsUsingGET(businessCaseId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AttachmentDTO>>>;
    public findAttachmentByBusinessCaseIdsUsingGET(businessCaseId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AttachmentDTO>>>;
    public findAttachmentByBusinessCaseIdsUsingGET(businessCaseId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (businessCaseId === null || businessCaseId === undefined) {
            throw new Error('Required parameter businessCaseId was null or undefined when calling findAttachmentByBusinessCaseIdsUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (businessCaseId !== undefined && businessCaseId !== null) {
            queryParameters = queryParameters.set('businessCaseId', <any>businessCaseId);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<AttachmentDTO>>(`${this.basePath}/working-portal/attachment/find_attachments_by_businessCaseId`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * queryAttachmentTypes
     * 
     * @param processId processId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public queryAttachmentTypesUsingGET(processId?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<AttachmentTypeDTO>>;
    public queryAttachmentTypesUsingGET(processId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AttachmentTypeDTO>>>;
    public queryAttachmentTypesUsingGET(processId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AttachmentTypeDTO>>>;
    public queryAttachmentTypesUsingGET(processId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (processId !== undefined && processId !== null) {
            queryParameters = queryParameters.set('processId', <any>processId);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<AttachmentTypeDTO>>(`${this.basePath}/working-portal/attachment/query_attachmentTypes`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * queryAttachments
     * 
     * @param businessCaseId businessCaseId
     * @param pageNumber pageNumber
     * @param pageSize pageSize
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public queryAttachmentsUsingGET(businessCaseId: string, pageNumber?: number, pageSize?: number, observe?: 'body', reportProgress?: boolean): Observable<PageInfoOfAttachmentDTO>;
    public queryAttachmentsUsingGET(businessCaseId: string, pageNumber?: number, pageSize?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageInfoOfAttachmentDTO>>;
    public queryAttachmentsUsingGET(businessCaseId: string, pageNumber?: number, pageSize?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageInfoOfAttachmentDTO>>;
    public queryAttachmentsUsingGET(businessCaseId: string, pageNumber?: number, pageSize?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (businessCaseId === null || businessCaseId === undefined) {
            throw new Error('Required parameter businessCaseId was null or undefined when calling queryAttachmentsUsingGET.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (businessCaseId !== undefined && businessCaseId !== null) {
            queryParameters = queryParameters.set('businessCaseId', <any>businessCaseId);
        }
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<PageInfoOfAttachmentDTO>(`${this.basePath}/working-portal/attachment/query_attachments`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * uploadAttachments
     * 
     * @param attachmentTypeId attachmentTypeId
     * @param businessCaseId businessCaseId
     * @param file file
     * @param businessDataId businessDataId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public uploadAttachmentsUsingPOST(attachmentTypeId: string, businessCaseId: string, file: Blob, businessDataId?: string, observe?: 'body', reportProgress?: boolean): Observable<number>;
    public uploadAttachmentsUsingPOST(attachmentTypeId: string, businessCaseId: string, file: Blob, businessDataId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<number>>;
    public uploadAttachmentsUsingPOST(attachmentTypeId: string, businessCaseId: string, file: Blob, businessDataId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<number>>;
    public uploadAttachmentsUsingPOST(attachmentTypeId: string, businessCaseId: string, file: Blob, businessDataId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (attachmentTypeId === null || attachmentTypeId === undefined) {
            throw new Error('Required parameter attachmentTypeId was null or undefined when calling uploadAttachmentsUsingPOST.');
        }

        if (businessCaseId === null || businessCaseId === undefined) {
            throw new Error('Required parameter businessCaseId was null or undefined when calling uploadAttachmentsUsingPOST.');
        }

        if (file === null || file === undefined) {
            throw new Error('Required parameter file was null or undefined when calling uploadAttachmentsUsingPOST.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (attachmentTypeId !== undefined && attachmentTypeId !== null) {
            queryParameters = queryParameters.set('attachmentTypeId', <any>attachmentTypeId);
        }
        if (businessCaseId !== undefined && businessCaseId !== null) {
            queryParameters = queryParameters.set('businessCaseId', <any>businessCaseId);
        }
        if (businessDataId !== undefined && businessDataId !== null) {
            queryParameters = queryParameters.set('businessDataId', <any>businessDataId);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (file !== undefined) {
            formParams = formParams.append('file', <any>file) || formParams;
        }

        return this.httpClient.post<number>(`${this.basePath}/working-portal/attachment/upload_attachments`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}