import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CommonService, ISidebarSwitch } from 'smsf-ui-layout';
import { DirectiveControllerService } from 'src/app/services/rest/api/api';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  @ViewChild('table') table: Table;
  @ViewChild('editSidebar') editSidebar: ISidebarSwitch;

  totalRecords = 0;
  page = 1;
  pageSize = 10;
  first = 0;
  loading = false;
  tableSelectedRows: any[];
  tableData: any[];
  tableCols: any[];
  i18n: any;

  constructor(private directiveControllerService: DirectiveControllerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public cs: CommonService) {

  }

  ngOnInit() {
    this.tableData = [];
  }

  createDirective() {
    this.editSidebar.open();
    event.preventDefault();
  }

  deleteDirective(event: Event, data: any) {
    this.confirmationService.confirm({
      message: this.cs.L('message.deleteConfirmation', data),
      header: this.cs.L('directive.message.alertTitle'),
      icon: 'fa ui-icon-warning',
      accept: () => {
        this.directiveControllerService.deleteDirectiveUsingPOST(data).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: this.cs.L('directive.message.alertTitle'),
              detail: this.cs.L('message.deleteSuccessful')
            });
            this.reload();
          },
          () => this.messageService.add({
            severity: 'error',
            summary: this.cs.L('directive.message.alertTitle'),
            detail: this.cs.L('message.deleteFailed')
          })
        );
      }
    });
    event.preventDefault();
  }

  deleteMultipleDirective(event: Event) {
    this.confirmationService.confirm({
      message: this.cs.L('message.deleteMultipleConfirmation'),
      header: this.cs.L('directive.message.alertTitle'),
      icon: 'fa ui-icon-warning',
      accept: () => {
        this.directiveControllerService.deleteDirectiveMultipleUsingPOST(this.tableSelectedRows).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: this.cs.L('directive.message.alertTitle'),
              detail: this.cs.L('message.deleteSuccessful')
            });
            this.reload();
          },
          () => this.messageService.add({
            severity: 'error',
            summary: this.cs.L('directive.message.alertTitle'),
            detail: this.cs.L('message.deleteFailed')
          })
        );
      }
    });
    event.preventDefault();
  }

  editDirective(event: Event, id: string) {
    this.editSidebar.open(id);
    event.preventDefault();
  }

  loadPage(event) {
    if (0 !== event.rows && 0 !== event.first) {
      this.page = Math.floor(event.rows / event.first) + 1;
    } else {
      this.page = 1;
    }
    this.filter();
  }

  reload() {
    this.table.reset();
    this.filter();
  }

  filter() {
    this.loading = true;
    this.directiveControllerService.queryDirectiveUsingGET(
      undefined,
      this.page,
      this.pageSize
    ).subscribe(
      res => {
        console.log(`directive filter response:${res}`);
        this.tableData = res.list;
        this.first = res.startRow;
        this.totalRecords = res.total;
        this.loading = false;
      }
    );
  }

}
