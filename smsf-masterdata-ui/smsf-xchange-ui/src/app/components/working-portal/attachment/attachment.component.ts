import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Table } from 'primeng/table';
import { CommonService, ISidebarSwitch, firstRowToPage } from 'smsf-ui-layout';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AttachmentService } from 'src/app/services/rest/api/api';

import { environment } from 'src/environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-working-portal-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {


  @Input() businessCaseId = '' ;
  @Input() businessDataId = '';
  @Input() fileUploadDisabled = false;
  @Input() processId = null;

  @ViewChild('table') table: Table;

  totalRecords: number;
  page = 1;
  pageSize = 10;
  first = 0;
  loading = false;
  tableSelectedRows: any[];
  tableData: any[];
  i18n: any;
  attachTypes: any[];
  selectedAttachType: any;

  constructor(public cs: CommonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private oauthService: OAuthService,
    private attachmentService: AttachmentService) {
  }

  ngOnInit() {
    this.tableData = [];
    this.attachTypes = [];

    this.attachmentService.queryAttachmentTypesUsingGET(this.processId).subscribe(
      res => {
        res.forEach((data) => {
          this.attachTypes.push( { label: data.name, value: data.id });
        });
        this.selectedAttachType = this.attachTypes[0].value;

      }, error => {
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('xchange.message.alertTitle'),
          detail: JSON.stringify(error)
        });
      }
    );
  }


  loadPage(event) {
    this.page = firstRowToPage(event.first, event.rows);
    this.filter();
  }

  reload() {
    this.table.reset();
    this.filter();
  }

  filter() {
    this.loading = true;
    this.attachmentService.queryAttachmentsUsingGET(this.businessCaseId, this.page, this.pageSize
      ).subscribe(
      res => {
        this.tableData = res.list;
        this.first = res.startRow;
        this.totalRecords = res.total;
        this.loading = false;
      }, error => {
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('xchange.message.alertTitle'),
          detail: JSON.stringify(error)
        });
      }
    );

  }

  downloadAttachment(event: Event, data: any) {
    const url = `${environment.serverUri}/working-portal/attachment/download_attachments?attachmentId=` + data.id;
    const xhr = new XMLHttpRequest();
    const token = 'Bearer ' + this.oauthService.getAccessToken();
    const tenantId = environment.tenantId;
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', token);
    xhr.setRequestHeader('tenantId', tenantId);
    xhr.responseType = 'blob';
    xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
            FileSaver.saveAs(xhr.response, data.attachmentName);
        }
    };
    xhr.onerror = (error) => {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('working-portal.attachment.alertTitle'),
        detail: this.cs.L('working-portal.attachment.mess.error_34108')
      });
    };
    xhr.send();

    event.preventDefault();
  }

  deleteAttachment(event: Event, data: any) {
    this.confirmationService.confirm({
      message: this.cs.L('working-portal.attachment.deleteConfirmation', data),
      header: this.cs.L('working-portal.attachment.alertTitle'),
      icon: 'fa ui-icon-warning',
      accept: () => {
        this.attachmentService.deleteAttachmentUsingGET(data.id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: this.cs.L('working-portal.attachment.alertTitle'),
              detail: this.cs.L('message.deleteSuccessful')
            });
            this.reload();
          },
          () => this.messageService.add({
            severity: 'error',
            summary: this.cs.L('working-portal.attachment.alertTitle'),
            detail: this.cs.L('message.deleteFailed')
          })
        );
      }
    });

    event.preventDefault();
  }


  attachUploader(event, fileUpload: any) {
    this.attachmentService.uploadAttachmentsUsingPOST(
      this.selectedAttachType , this.businessCaseId, event.files[0]).subscribe(
        res => {
          this.messageService.add({
            severity: 'success',
            summary: this.cs.L('message.updateSuccess'),
            detail: this.cs.L('message.updateSuccess')
          });

          fileUpload.clear();
          this.filter();
        }, error => {
          if (error.error.code === 34000) {
            this.messageService.add({
              severity: 'error',
              summary: this.cs.L('working-portal.attachment.alertTitle'),
              detail:  this.cs.L('working-portal.attachment.mess.error_34000')
            });

          } else {
            this.messageService.add({
              severity: 'error',
              summary: this.cs.L('working-portal.attachment.alertTitle'),
              detail:  JSON.stringify(error)
            });
          }
        }
    );
  }

  cancel(fileUpload: any) {
    fileUpload.clear();
  }

  onSelect(fileUpload: any) {
    if (fileUpload.msgs.length > 0) {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('working-portal.attachment.alertTitle'),
        detail:  fileUpload.msgs[0].detail
      });
    }
  }

}
