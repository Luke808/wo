import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ISidebarSwitch, CommonService } from 'smsf-ui-layout';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { BusinessObjectService, ValidationRuleControllerService } from '../../../services/rest';
import { CodeTable } from './../../../../app/shared/common/codetable';

@Component({
  selector: 'app-validation-setting',
  templateUrl: './validation-setting.component.html',
  styleUrls: ['./validation-setting.component.scss']
})
export class ValidationSettingComponent implements OnInit {
  @ViewChild('table') table: Table;
  @Output() reload = new EventEmitter();

  sidebarVisible = false;
  tableSelectedRows: any[];
  validationOptions: any[];
  i18n: any;

  page = 0;
  pageSize = 0;

  formData: {
    'propertyValidations'?: any[],
    'propertyId'?: string,
    'propertyName'?: string
  };

  constructor(private messageService: MessageService,
    private businessObjectService: BusinessObjectService,
    private validationRuleControllerService: ValidationRuleControllerService,
    private codeTable: CodeTable,
    public cs: CommonService) { }

  ngOnInit() {
    this.formData = {};
    // 读取validation下拉框的options
    this.validationRuleControllerService.queryValidationRuleUsingGET( '', this.page,
      this.pageSize).subscribe(res => {
        this.validationOptions = [];
        res.list.map( vo => {
          const option = {name: vo.name, type: vo.id};
          this.validationOptions.push(option);
        });
        // console.log(JSON.stringify(this.validationOptions));
      });
  }
  changeValidationOptions(event, rowData) {
    event.originalEvent.preventDefault();
    if (event.value) {
      rowData.formatValidationRuleName = event.value.name;
      rowData.formatValidationRuleId = event.value.type;
    } else {
      rowData.formatValidationRuleName = '';
      rowData.formatValidationRuleId = '';
    }
  }

  /**
   * Open the directive edit form
   * if id has value then edit else create
   * @param id directive id
   */
  open(id) {
    if (id) {
      this.formData.propertyId = id;
      this.loadInfo();
      this.loadData();
    } else {
      this.formData = {};
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('xchange.message.alertTitle'),
        detail: this.cs.L('businessObject.message.propertyIdIsNotNull')
      });
      this.sidebarVisible = false;
    }
    this.sidebarVisible = true;
  }

  /**
   * close the component edit form
   */
  close() {
    this.sidebarVisible = false;
  }

  save() {
    this.formData.propertyValidations = this.formData.propertyValidations.filter(function(el) {
      // keep element if it's not an object, or if it's a non-empty object
      return typeof el !== 'object' || Array.isArray(el) || Object.keys(el).length > 0;
      });
      for (let i = 0; i < this.formData.propertyValidations.length; i++ ) {
        const validation = this.formData.propertyValidations[i];
          if (!validation.formatValidationRuleName) {
            this.messageService.add({
              severity: 'error',
              summary: this.cs.L('xchange.message.alertTitle'),
              detail: this.cs.L('message.inValidData')
            });
            return;
          }
      }
    this.businessObjectService.saveValidationUsingPOST(this.formData).subscribe(res => {
      if (res > 0) {
        this.messageService.add({
          severity: 'success',
          summary: this.cs.L('message.addSuccess'),
          detail: this.cs.L('message.addSuccess')
        });
      }
      this.close();
      this.reload.emit();
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('xchange.message.alertTitle'),
        detail: this.cs.L('message.inValidData')
      });
    });
  }

  add(event: Event) {
    this.formData.propertyValidations.push({});
    event.preventDefault();
  }

  delete(event: Event, index: number) {
    this.formData.propertyValidations.splice(index, 1);
    event.preventDefault();
  }

  loadData() {
    if (this.formData.propertyId) {
      this.businessObjectService.queryValidationUsingGET(this.formData.propertyId).subscribe(res => {
        if (res) {
          this.formData.propertyValidations = res;
          this.formData.propertyValidations.map(r => {
            r.formatValidationRuleName = this.codeTable.getOptionNameByKey(this.validationOptions, r.formatValidationRuleId);
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
  }
  loadInfo() {
    if (this.formData.propertyId) {
      this.businessObjectService.findBusinessPropertyUsingGET(this.formData.propertyId).subscribe(res => {
        this.formData.propertyName = res.name;
      }, error => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('xchange.message.alertTitle'),
          detail: error
        });
      });
    }
  }
}
