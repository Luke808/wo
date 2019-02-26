import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { CommonService, ISidebarSwitch } from 'smsf-ui-layout';
import {Table} from 'primeng/table';
import {ConfirmationService, LazyLoadEvent, MessageService, SelectItem} from 'primeng/api';
import {
  NoncomplianceControllerService,
  NoncomplianceDTO
} from '../../../services/nc-rest';

@Component({
  selector: 'app-noncompliance-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {


  @ViewChild(Table) tableView: Table;
  @ViewChild('editSidebar') editSidebar: ISidebarSwitch;

  @Input() searchId: string;
  @Input() isDisabled: boolean;

  detailPanelDisplayFlg: boolean;
  content: NoncomplianceDTO[];
  selectedContent: NoncomplianceDTO[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  loading: boolean;
  detailEditFlg: boolean;
  constructor(private ncService: NoncomplianceControllerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public cs: CommonService) { }

  ngOnInit() {
    this.loading = true;
    this.content = [];
    this.selectedContent = [];
    this.page = 0;
    this.size = 10;
    this.totalElements = 0;
    this.totalPages = 0;

  }

  /**
   * 列表数据加载
   */
  data() {
    this.ncService.queryPageInfoByIdUsingGET(this.page, this.size, this.searchId)
      .subscribe(
        page => {
          this.content = page.list;
          this.totalElements = page.total;
          this.totalPages = page.pages;
        },
        () => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        });
  }

  /**
   * 延时加载
   * @param event 事件
   */
  lazyLoad(event: LazyLoadEvent) {
    if (event.first === 0) {
      this.page = 1;
    } else {
      this.page = (event.first / event.rows) + 1;
    }
    this.size = event.rows;
    this.data();
  }

  /**
   * 创建一个新的NC
   */
  create() {
    this.editSidebar.open();
    event.preventDefault();
  }
  /**
   * 点击修改按钮
   * @param rowData 行数据
   */
  modify(rowData) {
    console.log(rowData);
    this.editSidebar.open(rowData.id);
    event.preventDefault();
  }

  /**
   * 删除操作
   */
  private doDelete(ids: string[]) {
    this.ncService.batchDeleteNCObjectsUsingGET(ids.join(',')).subscribe(
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

  /**
   * 删除单一记录
   */
  deleteOne(rowData) {
    this.confirmationService.confirm({
      header: this.cs.L('delete'),
      message: this.cs.L('noncompliance.message.deleteSingle'),
      icon: 'fa ui-icon-warning',
      accept: () => {
        this.doDelete([rowData.id]);
      }
    });
    event.preventDefault();
  }

  /**
   * 多选删除
   * @param rowData ID集合
   */
  deleteAll(rowData: NoncomplianceDTO[]) {
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

  /**
   * table数据的从新加载
   */
  reload() {
    this.selectedContent = [];
    this.tableView.reset();
  }

  // closeNC(e) {
  //   if (e.checked) {
  //     this.confirmationService.confirm({
  //       header: this.cs.L('batchDelete'),
  //       message: this.cs.L('message.deleteMultipleConfirmation'),
  //       icon: 'fa ui-icon-warning',
  //       accept: () => {
  //         this.content[0].closed = 0;
  //       }
  //     });
  //   }
  //   event.preventDefault();
  // }
}
