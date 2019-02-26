import { Component, OnInit, ViewChild} from '@angular/core';
import {TreeNode} from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { CommonService, ISidebarSwitch } from 'smsf-ui-layout';
import { BusinessObjectService,BusinessObjectDTO } from '../../../services/rest';

@Component({
  selector: 'app-object-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    // @ViewChild('table') table: Table;
    @ViewChild('editSidebar') editSidebar: ISidebarSwitch;

    totalRecords: number;
    page = 1;
    pageSize = 10;
    first = 0;

    treedatas: TreeNode[];
    selectedNodes: TreeNode[];
    isOpened: boolean;
    cols: any[];

    loading: boolean;
    // 弹出页面
    display = false;
    paramId; // 传递参数
    oprationType; // 传递新增节点类型

    constructor(public cs: CommonService,
      private confirmationService: ConfirmationService,
      private translate: TranslateService,
      private messageService: MessageService,
      private businessObjectService: BusinessObjectService) { }

    ngOnInit() {
        this.cols = [
            { field: 'add', header: '' },
            { field: 'addParent', header: 'addParent' },
            { field: 'chk', header: 'chk' },
            { field: 'rowNum', header: 'rowNum' },
            { field: 'operation', header: 'operation' },
            { field: 'name', header: 'Name' },
            { field: 'businessDomain', header: 'businessDomain' },
            { field: 'description', header: 'description' }
        ];
        //  in a production application, retrieve the logical number of rows from a remote datasource
        this.totalRecords = 1000;

        this.loading = true;
    }
    filter() {
      this.loading = true;

        this.businessObjectService.queryBusinessObjectUsingGET(this.page,
          this.pageSize).subscribe(res => {
            // console.log(JSON.stringify(res));
            if (res.list) {
              this.loading = false;
              this.treedatas = [];
              this.first = res.startRow;
              this.totalRecords = res.total;
              res.list.map(row => {
                const node = {
                  data: {
                    add: '',
                    addParent: '',
                    chk: '',
                    rowNum: row.rowNum,
                    operation: '',
                    name: row.name,
                    businessDomain: row.businessDomain,
                    description: row.description,
                    parentId: row.parentId,
                    isOpened: false,
                    id: row.id
                  },
                  leaf: false // row.isLeaf
                };

                this.treedatas.push(node);
              });
            }
          }, error => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: this.cs.L('xchange.message.alertTitle'),
              detail: error
            });
          });
    }
    loadNodes(event) {
      if (0 !== event.rows && 0 !== event.first) {
        this.page = Math.floor(event.rows / event.first) + 1;
      } else {
        this.page = 1;
      }

      this.filter();
    }

    onNodeExpand(event) {
        this.loading = true;
        const node = event.node;
        this.businessObjectService.queryBusinessObjectByParentIdUsingGET(node.data.id).subscribe(res => {
          // console.log(JSON.stringify(res));
          this.loading = false;
          node.children = [];
          res.map(row => {
            const children = {
              data: {
                add: '',
                chk: '',
                addParent: '',
                rowNum: row.rowNum,
                operation: '',
                name: row.name,
                businessDomain: row.businessDomain,
                description: row.description,
                parentId: row.parentId,
                isOpened: true,
                id: row.id
              },
              leaf: false // row.isLeaf
            };
            node.children.push(children);
          });

        this.treedatas = [...this.treedatas];
        });
    }
    delete(event, rowData) {
      const deleteRows = [];
      deleteRows.push(rowData);
        // console.log('delete' + JSON.stringify(node.data));
      this.businessObjectService.batchDeleteBusinessObjectsUsingPOST(deleteRows).subscribe(res => {
        this.filter(); // 刷新
        this.messageService.add({
          severity: 'success',
          summary: this.cs.L('message.deleteSuccessful'),
          detail: this.cs.L('message.deleteSuccessful')
        });
      }, error => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('message.error'),
          detail: this.cs.L('message.errorCode.'.concat(error.error.code))
        });
      });
      event.preventDefault();
    }

    deleteBatch() {
      const deleteRows = [];
      this.selectedNodes.map(node => {
        deleteRows.push(node.data);
        // console.log('delete' + JSON.stringify(node.data));
      });
      this.businessObjectService.batchDeleteBusinessObjectsUsingPOST(deleteRows).subscribe(res => {
        this.filter(); // 刷新
        this.messageService.add({
          severity: 'success',
          summary: this.cs.L('message.deleteSuccessful'),
          detail: this.cs.L('message.deleteSuccessful')
        });
      }, error => {
        console.log(error);

        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('xchange.message.alertTitle'),
          detail: error
        });
      });
      event.preventDefault();
    }
}
