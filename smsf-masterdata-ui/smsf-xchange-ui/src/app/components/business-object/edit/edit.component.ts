import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { Table } from 'primeng/table';
import { CommonService, ISidebarSwitch } from 'smsf-ui-layout';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import { BusinessObjectService } from '../../../services/rest';
import {SelectItem} from 'primeng/api';
import { CodeTable } from './../../../../app/shared/common/codetable';

import {FormControl, Validators} from '@angular/forms';
import { rootRenderNodes } from '@angular/core/src/view';

@Component({
  selector: 'app-object-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnChanges {
  // 响应式表单定义
  id = new FormControl('');
  parentId = new FormControl('', Validators.required);
  name = new FormControl('', [Validators.required, Validators.maxLength(45)]);
  businessDomain = new FormControl('', [Validators.required, Validators.maxLength(45)]);
  description = new FormControl('', [Validators.maxLength(45)]);

  @Input() data: string;

  @ViewChild('table') table: Table;
  @ViewChild('editSidebar') editSidebar: ISidebarSwitch;
  totalRecords: number;
  page = 1;
  pageSize = 10;
  first = 0;
  loading = false;
  tableSelectedRows: any[];
  tableData: any[];
  tableCols: any[];
  i18n: any;

  // table dropdown
  dataTypeOptions: any = this.codeTable.dataTypeOptions;
  dbFieldOptions: any = this.codeTable.dbFieldOptions;

  // add row
  addedRow: any;

  // form
  types: SelectItem[];
  selectedType;

  // from index param
  paramId: any;
  oprationType: any;

  // autocomplete
  parentOptions: SelectItem[] = [];

  // submit data construct
  formData: {
    'businessPropertys'?: any[],
    'businessDomain'?: string,
    'description'?: string,
    'id'?: string,
    'name'?: string,
    'parentId'?: string
  };

  ngOnChanges() {

  }

  constructor(
    private confirmationService: ConfirmationService,
    private translate: TranslateService,
    private messageService: MessageService,
    public cs: CommonService,
    private businessObjectService: BusinessObjectService,
    private routerinfo: ActivatedRoute,
    private codeTable: CodeTable) {
    }

  ngOnInit() {
    this.formData = {};
    this.tableCols = [
      // { field: 'no', header: this.cs.L('businessObject.edit.table.no') },
      // { field: 'action', header: this.cs.L('businessObject.edit.table.action') },
      { field: 'validationRuleNames', header: this.cs.L('businessObject.edit.table.validation') },
      { field: 'name', header: this.cs.L('businessObject.edit.table.name') },
      { field: 'dataType', header: this.cs.L('businessObject.edit.table.dataType') },
      { field: 'length', header: this.cs.L('businessObject.edit.table.length') },
      { field: 'mappingColumn', header: this.cs.L('businessObject.edit.table.mappingColumn') },
      { field: 'label', header: this.cs.L('businessObject.edit.table.label') },
      { field: 'displayIndex', header: this.cs.L('businessObject.edit.table.displayIndex') },
      { field: 'description', header: this.cs.L('businessObject.edit.table.description')}
    ];
    this.tableData = [];
    // 接收参数
    this.paramId = this.routerinfo.snapshot.queryParams['paramId'];
    this.oprationType = this.routerinfo.snapshot.queryParams['oprationType'];
    // console.log('接收参数:' + this.paramId + ',oprationType:' + this.oprationType);

    this.businessObjectService.queryBusinessObjectByNameUsingGET('').subscribe(res => {
      const root = {
        label: '顶级',
        value: 'ROOT'
      };
      this.parentOptions.push(root);
      res.map(dto => {
        const option = {
          label: dto.name,
          value: dto.id
        };
        this.parentOptions.push(option);
      });
      // console.log('获取parent下拉：' + JSON.stringify(this.parentOptions));

      if (this.paramId && this.oprationType === 'addParent') {
        this.id.setValue(this.paramId);
        this.loading = true;
        this.businessObjectService.findBusinessObjectByIdUsingGET(this.id.value).subscribe(data => {
          // 响应式表单赋值
          this.parentId.setValue(data.parentId);
          this.name.setValue(data.name);
          this.businessDomain.setValue(data.businessDomain);
          this.description.setValue(data.description);
          this.loading = false;
        });
      }
    });
    // if (this.paramId && this.oprationType === 'addChild') {
    //   this.formData.parentId = this.paramId;
    //   this.paramId = ''; // 如果增加下级，无需查询列表
    // }

  }

  filter() {
    this.loading = true;
    // console.log('查询列表id：' + this.paramId);
    if (this.paramId) {
      this.businessObjectService.queryBusinessPropertyUsingGET(this.paramId,
          undefined
          )
        .subscribe(
          res => {
            this.tableData = res;
            // this.first = res.startRow;
            // this.totalRecords = res.total;
            this.loading = false;
          }
        );
    }
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

  delete(event: Event, index: number, rowData) {
    if (rowData.id) {
      this.businessObjectService.deleteBusinessPropertyUsingDELETE(rowData.id).subscribe(res => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: this.cs.L('message.deleteSuccessful'),
            detail: this.cs.L('message.deleteSuccessful')
          });
          this.reload();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('xchange.message.deleteFailed'),
            detail: this.cs.L('xchange.message.deleteFailed')
          });
        }
      }, error => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('xchange.message.alertTitle'),
          detail: this.cs.L('message.errorCode.'.concat(error.error.code))
        });
      });
    } else {
      this.tableData.splice(index, 1);
    }
    event.preventDefault();
  }
  checkColIsUnique(ary: Array<any>) {
    const nary = ary.sort();
    for (let i = 0; i < ary.length; i++) {
      if (nary[i].mappingColumn === nary[i + 1].mappingColumn) {
        return nary[i].mappingColumn;
      }
    }
    return '';
  }
  save() {
    // save form & tabledata
    if (!this.tableData || this.tableData.length <= 0 ) {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('message.inValidData'),
        detail: this.cs.L('businessObject.message.tableDataIsNull')
      });
      return;
    }
    if (!this.checkTableData()) {
      return;
    }
    // check mappingColumn is unique 在选择下拉已校验，此处验证不使用
    // const checkMsg = this.checkColIsUnique(this.tableData);
    // if (checkMsg !== '') {
    //   const data = {
    //     column: 'DB Field',
    //     value: checkMsg
    //   };
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: this.cs.L('xchange.message.alertTitle'),
    //     detail: this.cs.L('businessObject.message.columnIsNotUnique', data)
    //   });
    //   return;
    // }
    this.formData.id = this.id.value;
    this.formData.name = this.name.value;
    this.formData.parentId = this.parentId.value;
    this.formData.businessDomain = this.businessDomain.value;
    this.formData.description = this.description.value;

    this.formData.businessPropertys = this.tableData;
    // console.log('request:' + JSON.stringify(this.formData));
    this.businessObjectService.saveBusinessObjectPropertyUsingPOST(this.formData)
    .subscribe(res => {
      this.id.setValue(res);
      this.paramId = res; // 保存后重新赋值，作为查询列表条件
      // console.log('response:' + JSON.stringify(res));
      this.reload(); // 刷新页面
      this.messageService.add({
        severity: 'success',
        summary: this.cs.L('message.saveSuccess'),
        detail: this.cs.L('message.saveSuccess')
      });
    }, error => {
      console.log(error);
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('xchange.message.alertTitle'),
        detail: error
      });
    });
    // console.log('save...' + JSON.stringify(this.tableData));
  }
  addRow(event: Event) {
    this.addedRow = {};
    this.tableData.push(this.addedRow);
    event.preventDefault();
    // console.log(JSON.stringify(this.tableData));
  }

  changeDataTypeOptions(event, rowData) {
    if (event.value) {
      rowData.dataType = event.value.type;
    } else {
      rowData.datatype = '';
    }
  }
  changeDbFieldOptions(event, rowData) {
    for (let i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i].mappingColumn === event.value.type) {
        const data = {
          column: 'DB Field',
          value: event.value.type
        };
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('xchange.message.alertTitle'),
          detail: this.cs.L('businessObject.message.columnIsNotUnique', data)
        });
        rowData.mappingColumnLabel = '';
        rowData.mappingColumn = '';
        return;
      }
    }
    if (event.value) {
      rowData.mappingColumn = event.value.type;
    } else {
      rowData.mappingColumn = '';
    }
  }

  checkTableData() {
    for (let i = 0; i < this.tableData.length; i++) {
      const row = this.tableData[i];
      let colName = '';
      if (!row.mappingColumn) {
        colName = 'DB Field';
      }
      if (!row.name) {
        colName = 'Name';
      }
      if (!row.dataType) {
        colName = 'Data Type';
      }
      if (!row.length) {
        colName = 'Length';
      }
      if (!row.displayIndex) {
        colName = 'Display Index';
      }

      if (colName) {
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('xchange.message.alertTitle'),
          detail: 'on row ' + (i + 1) + ' , ' + colName + ' can not be null'
        });
        return false;
      }
    }
    return true;
  }
  /*
  * 获取某个元素下标
  * arrays  : 传入的数组
  * obj     : 需要获取下标的元素
  * */
  indexOf(arrays, obj) {
    let i = arrays.length;
    while (i--) {
        if (arrays[i] === obj) {
            return i;
        }
    }
    return false;
  }
  selectValidation(rowData) {
    // console.log(rowData);
    if (rowData.id) {
      this.editSidebar.open(rowData.id);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('xchange.message.alertTitle'),
        detail: this.cs.L('businessObject.message.propertyIdIsNotNull')
      });
    }
  }
}
