import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonService} from 'smsf-ui-layout';
import {Table} from 'primeng/table';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import {TemplateControllerService, TemplateDTO} from '../../../services/rest';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-template-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  @ViewChild(Table) tableView: Table;
  content: TemplateDTO[];
  selectedContent: TemplateDTO[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  loading: boolean;

  constructor(private serverService: TemplateControllerService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              public cs: CommonService,
              private router: Router,
              private ar: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = true;
    this.content = [];
    this.selectedContent = [];
    this.page = 0;
    this.size = 10;
    this.totalElements = 0;
    this.totalPages = 0;
  }

  data() {
    this.serverService.queryTemplatePageUsingGET(this.page, this.size)
      .subscribe(
        page => {
          this.content = page.list;
          this.totalElements = page.total;
          this.totalPages = page.pages;
        },
        () => {

        },
        () => {
          this.loading = false;
        });
  }


  lazyLoad(event: LazyLoadEvent) {
    if (event.first === 0) {
      this.page = 1;
    } else {
      this.page = (event.first / event.rows) + 1;
    }
    this.size = event.rows;
    this.data();
  }


  create() {
    this.router.navigate(['../new'], {relativeTo: this.ar});
  }

  modify(rowData) {
    console.log(rowData);
    this.router.navigate(['../', rowData.id], {relativeTo: this.ar});
  }


  private doDelete(ids: string[]) {
    this.serverService.deleteTemplateUsingDELETE(ids.join(',')).subscribe(
      (next) => {
        this.messageService.add({
          severity: 'success',
          summary: this.cs.L('delete'),
          detail: this.cs.L('message.deleteSuccessful')
        });
        this.reload();
      },
      (value) => {
        const error = value.error;
        let msg;
        if (error.code === 30051) {
          msg = this.cs.L('errorMessage.error30051');
        } else {
          msg = this.cs.L('message.deleteFailed');
        }
        return this.messageService.add({
          severity: 'error',
          summary: this.cs.L('delete'),
          detail: msg
        });
      }
    );
  }

  deleteOne(rowData) {
    this.confirmationService.confirm({
      header: this.cs.L('delete'),
      message: this.cs.L('message.deleteConfirmation', {name: rowData.name}),
      icon: 'fa ui-icon-warning',
      accept: () => {
        this.doDelete([rowData.id]);
      }
    });
    event.preventDefault();
  }

  deleteAll(rowData: TemplateDTO[]) {
    this.confirmationService.confirm({
      header: this.cs.L('batchDelete'),
      message: this.cs.L('message.deleteMultipleConfirmation'),
      icon: 'fa ui-icon-warning',
      accept: () => {
        const ids = rowData.map(value => value.id);
        this.doDelete(ids);
      }
    });
    event.preventDefault();
  }

  reload() {
    this.selectedContent = [];
    this.tableView.reset();
  }

}
