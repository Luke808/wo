import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CommonService, ISidebarSwitch, firstRowToPage } from 'smsf-ui-layout';
import { Router} from '@angular/router'; // 导入router服务
import { BusinessCaseService, BusinessCaseDTO, SearchOrderBy, XchangeControllerService } from '../../../services/rest';
import { ConfirmationService, MessageService } from 'primeng/api';
import {LocalStorage} from './../../../../app/shared/common/dataStore';
import { SortEvent } from 'primeng/components/common/api';

import { environment } from 'src/environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  @ViewChild('table') table: Table;
  @ViewChild('editSidebar') editSidebar: ISidebarSwitch;
  @ViewChild('selectPersonSidebar') selectPersonSidebar: ISidebarSwitch;

  totalRecords: number;
  page = 1;
  pageSize = 10;
  first = 0;
  loading = false;
  tableSelectedRows: any[];
  tableData: any[];
  i18n: any;
  statusIconMap = {};
  // 查询条件
  searchDto: BusinessCaseDTO = {};
  // searchAuthTypeOptions: SelectItem[];
  // s_searchAuthType: any;

  selectedNodes: BusinessCaseDTO[] = [];

  // 判断操作权限(completed & terminate 不可操作)
  btnDisabled: Boolean = false;

  constructor(public cs: CommonService,
    private router: Router,
    private messageService: MessageService,
    private localStorage: LocalStorage,
    private service: XchangeControllerService,
    private oauthService: OAuthService,
    private businessCaseService: BusinessCaseService) { }

  ngOnInit() {
    // this.searchAuthTypeOptions = [
    //   {label: this.cs.L('working-list.searchAuthTypeOptions.ALL'), value: 'ALL'},
    //   {label: this.cs.L('working-list.searchAuthTypeOptions.OWNER'), value: 'OWNER'},
    //   {label: this.cs.L('working-list.searchAuthTypeOptions.OTHER'), value: 'OTHER'},
    //   {label: this.cs.L('working-list.searchAuthTypeOptions.UNDEAL'), value: 'UNDEAL'}
    // ];
    // 默认值
    // this.searchDto.searchAuthType = BusinessCaseDTO.SearchAuthTypeEnum.ALL;

    this.statusIconMap = {
      'Is Completed': 'fas fa-check-circle',
      'Is Exception': 'fas fa-trash-alt',
      'Is Nc': 'fas fa-pencil-alt',
      'Is Pending': 'fa fa-pause-circle',
      'Is Rejected': 'fas fa-sync',
      'Is Terminated': 'fa fa-stop-circle'
    }
  }


  loadPage(event) {
    this.searchDto = this.localStorage.getObject('businessCaseSearch_condition');
    // 排序
    if (event.sortField) {
      const order = event.sortOrder === 1 ? 'asc' : 'desc';
      const sort: SearchOrderBy = {
        sortBy: event.sortField,
        sortOrder: order
      };
      if (!this.searchDto.searchOrderBys) {
        this.searchDto.searchOrderBys = new Array<SearchOrderBy>();
      }
      this.searchDto.searchOrderBys.push(sort);
    }

    this.page = firstRowToPage(event.first, event.rows);
    this.filter();
  }

  reload() {
    this.table.reset();
    this.filter();
  }
  // changeSearchAuthTypeOptions(event: Event) {
  //   this.reload();
  // }

  filter() {
    this.loading = true;
    // this.searchDto.searchAuthType = this.s_searchAuthType ? this.s_searchAuthType : BusinessCaseDTO.SearchAuthTypeEnum.ALL;
    if (!this.searchDto.searchAuthType) {
      this.searchDto.searchAuthType = BusinessCaseDTO.SearchAuthTypeEnum.ALL;
    }

    this.businessCaseService.queryBusinessCaseUsingPOST(this.searchDto, this.page, this.pageSize
      ).subscribe(
      res => {
        this.tableData = res.list;
        this.first = res.startRow;
        this.totalRecords = res.total;
        this.loading = false;
      }, error => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('xchange.message.alertTitle'),
          detail: this.cs.L('message.errorCode.'.concat(error.error.code))
        });
      }
    );
  }

  locked(event: Event, rowData) {
    event.preventDefault();
    // lock case
    this.businessCaseService.lockBusinessCaseUsingGET(rowData.id, rowData.version).subscribe(
      res => {
      //   if (res === true) {
          // 跳转 working-portal
          this.editBusinessCase(event, rowData.id);
      //   }
      }, error => {
        console.log(error);
        if (error.error.code === 31004) {
          // 工作流已签收，则随机分配一个case
          this.next(event);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('xchange.message.alertTitle'),
            detail: this.cs.L('message.errorCode.'.concat(error.error.code))
          });
        }
      }
      );
  }
  next(event: Event) {
    event.preventDefault();
    this.searchDto = this.localStorage.getObject('businessCaseSearch_condition');
    this.businessCaseService.nextBusinessCaseUsingPOST(this.searchDto).subscribe(
      res => {
        if (res) {
          this.editBusinessCase(event, res.id);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('xchange.message.alertTitle'),
            detail: '无可用CASE数据.'
          });
          this.router.navigate(['/working-list']);
        }
    }, error => {
      console.log(JSON.stringify(error));
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('xchange.message.alertTitle'),
          detail: this.cs.L('message.errorCode.'.concat(error.error.code))
        });
    });
  }
  editBusinessCase(event: Event, id: string) {
    event.preventDefault();
    // this.editSidebar.open(id);
    this.router.navigateByUrl('working-portal/' + id);
  }

  onRowSelect(event) {
    this.btnIsDisabled(event);
  }
  onRowUnselect(event) {
    this.btnIsDisabled(event);
  }
  btnIsDisabled(event) {
    for (const rowNode of this.selectedNodes) {
      if (rowNode.dataStatus) {
        if ('Is Completed' === rowNode.dataStatus || 'Is Terminated' === rowNode.dataStatus ) {
          this.btnDisabled = true;
        }
      }
    }
    if (this.btnDisabled) {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('message.fail'),
        detail: this.cs.L('working-list.message.authCheckMsg')
      });
    }
  }

  checkSelectRowDataStatus(dataStatus) {
    for (const rowNode of this.selectedNodes) {
      if (rowNode.dataStatus) {
        if (dataStatus === rowNode.dataStatus) {
          return true;
        }
      }
    }
    return false;
  }
  open() {
    this.editSidebar.open();
  }

  openSelectPerson() {
    this.selectPersonSidebar.open(this.selectedNodes);
  }
  search(queryParam: any): void {
    this.searchDto = queryParam;
    // 设置并存储查询条件
    this.localStorage.setObject('businessCaseSearch_condition', this.searchDto);
    this.reload();
  }
  showIcon(dataStatus) {
    const strIcons = [];
    if (dataStatus) {
      const dss = dataStatus.split(',');
      for (const ds of dss) {
        if (this.statusIconMap[ds]) {
          strIcons.push(this.statusIconMap[ds]);
        }
      }
    }
    return strIcons;
  }

  // 批量处理
  bantchPause() {
    if (this.checkSelectRowDataStatus('Is Pending')) {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('message.fail'),
        detail: this.cs.L('working-list.message.hasPending')
      });
      return;
    }
    // let dto: BusinessCaseDTO = {
    //   id: this.id,
    //   transactionId: this.workingPortalDTO.businessCase.transactionId
    // };
    this.service.batchPauseOrResumeUsingPOST(this.selectedNodes).subscribe(value => {
        this.messageService.add({
          severity: 'success',
          summary: this.cs.L('message.success'),
          detail: this.cs.L('message.operationSuccess')
        });
        // this.isDoingTask = !value;
        // this.workingPortalDTO.businessCase.isPendding = value;
        this.reload();
      },
      e => {
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('message.fail'),
          detail: this.cs.L('message.errorCode.'.concat(e.error.code))
        });
      },
      () => {
      });
  }
  bantchReassign(queryParam: any) {
    // 接收传递人员id
    const selectedCases: BusinessCaseDTO[] = [];
    for (const node of this.selectedNodes) {
      node.operatorId = queryParam.id;
      selectedCases.push(node);
    }
    // let dto: BusinessCaseDTO = {
    //   id: this.id,
    //   transactionId: this.workingPortalDTO.businessCase.transactionId
    // };

    this.service.batchReassignUsingPOST(selectedCases).subscribe(value => {
      if (value) {
        this.messageService.add({
          severity: 'success',
          summary: this.cs.L('message.success'),
          detail: this.cs.L('message.operationSuccess')
        });
        this.reload();
        console.log('reload... end');
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('message.fail'),
          detail: this.cs.L('message.operationFail')
        });
      }
    },
    e => {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('message.fail'),
        detail: this.cs.L('message.errorCode.'.concat(e.error.code))
      });
    },
    () => {
    });
  }

  bantchTransafer() {
    // let dto: BusinessCaseDTO = {
    //   id: this.id,
    //   transactionId: this.workingPortalDTO.businessCase.transactionId
    // };
    this.service.batchTransferUsingPOST(this.selectedNodes).subscribe(value => {
      if (value) {
        this.messageService.add({
          severity: 'success',
          summary: this.cs.L('message.success'),
          detail: this.cs.L('message.operationSuccess')
        });
        this.reload();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('message.fail'),
          detail: this.cs.L('message.operationFail')
        });
      }
    },
    e => {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('message.fail'),
        detail: this.cs.L('message.errorCode.'.concat(e.error.code))
      });
    },
    () => {
    });
  }

  bantchTerminate() {
    // let dto: BusinessCaseDTO = {
    //   id: this.id,
    //   transactionId: this.workingPortalDTO.businessCase.transactionId
    // };
    this.service.batchTerminateUsingPOST(this.selectedNodes).subscribe(value => {
        if (value) {
          this.messageService.add({
            severity: 'success',
            summary: this.cs.L('message.success'),
            detail: this.cs.L('message.operationSuccess')
          });
          this.reload();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('message.fail'),
            detail: this.cs.L('message.operationFail')
          });
        }
      },
      e => {
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('message.fail'),
          detail: this.cs.L('message.errorCode.'.concat(e.error.code))
        });
      },
      () => {
      });
  }

  exportXls(event: Event) {
    this.searchDto = this.localStorage.getObject('businessCaseSearch_condition');
    if (!this.searchDto.searchAuthType) {
      this.searchDto.searchAuthType = BusinessCaseDTO.SearchAuthTypeEnum.ALL;
    }
    const url = `${environment.serverUri}/xchange/business-case/export-business-case`;
    const xhr = new XMLHttpRequest();
    const token = 'Bearer ' + this.oauthService.getAccessToken();
    const tenantId = environment.tenantId;
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.setRequestHeader('tenantId', tenantId);
    xhr.responseType = 'blob';
    xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
            FileSaver.saveAs(xhr.response, 'business_caselist.xls');
        }
    };
    xhr.onerror = (error) => {
      this.messageService.add({
           severity: 'error',
           summary: this.cs.L('xchange.message.alertTitle'),
           detail: this.cs.L('message.errorCode.' + error)
         });
    };
    xhr.send(JSON.stringify(this.searchDto));

    event.preventDefault();
  }
}
