import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import { CommonService, ISidebarSwitch } from 'smsf-ui-layout';
import {
  NcTypeControllerService,
  NoncomplianceControllerService,
  EmployeeControllerService,
  NoncomplianceDTO
} from '../../../services/nc-rest';

@Component({
  selector: 'app-noncompliance-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, ISidebarSwitch {

  @Output() reload = new EventEmitter();
  @Input() searchId: string;
  sidebarVisible = false;
  data: NoncomplianceDTO = {};
  ncTypeOptions: SelectItem[];
  createByOptions: SelectItem[];
  editFlg: number;
  id: string;
  i18n: any;
  selectDate: Date;
  
  constructor(private ncService: NoncomplianceControllerService,
    private ncTypeService: NcTypeControllerService,
    private employeeControllerService: EmployeeControllerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public cs: CommonService) { }

  ngOnInit() {
    this.dropdownInit();
  }

  /**
   * Open the component edit form
   * if id has value then edit else create
   * @param id component id
   */
  open(id?: any) {
    if (id) {
      // get by id
      this.ncService.findByNonComplianceIdUsingGET(id).subscribe(
        value => {
          this.data = value;
          if (this.data.feedbackTime) {
            this.data.feedbackTime = new Date(this.data.feedbackTime);
          }
          this.editFlg = value.closed;
          this.id = id;
        },
        res => {
          if (res.error.code === 34000) {
            this.messageService.add({
              severity: 'error',
              summary: this.cs.L('noncompliance.message.alertTitle'),
              detail: this.cs.L('message.noSuchData')
              });
            this.reload.emit();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: this.cs.L('noncompliance.message.alertTitle'),
              detail: this.cs.L('message.unknowError')
            });
          }
        }
      );
    } else {
      this.data = {};
      this.editFlg = 0;
      this.id = undefined;
    }

    this.sidebarVisible = true;
  }

  /**
   * close the component edit form
   */
  close() {
    this.sidebarVisible = false;
  }

  /**
   * if id has value then update else create
   */
  save() {
    /**
     * 验证处理
     */
    if (this.inputCheck()) {
      return;
    }

    if (this.id) {
      this.update();
    } else {
      this.create();
    }
  }

  /**
   * call service, put the form data to api
   */
  private update() {
    const updData: NoncomplianceDTO = this.data;
    // let continueFlg = false;
    if (this.data.closed || this.data.closed === 1) {

      // this.confirmationService.confirm({
      //   header: this.cs.L('alertTitle'),
      //   message: this.cs.L('noncompliance.message.closeComfirm'),
      //   icon: 'fa ui-icon-warning',
      //   accept: () => {
      //     continueFlg = true;
      //   }
      // });
      updData.closed = 1;
    } else {
      updData.closed = 0;
    }
    // if (!continueFlg && this.data.closed) {
    //   return ;
    // }
    this.ncService
      .updateNoncomplianceUsingPOST(updData)
      .subscribe(res => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: this.cs.L('message.updateSuccess'),
          detail: this.cs.L('message.updateSuccess')
        });
        this.close();
        this.reload.emit();
      },
      res => {
        if (res.error.code === 34001) {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('noncompliance.message.alertTitle'),
            detail: this.cs.L('message.noSuchData')
          });
        } else if (res.error.code === 34002) {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('noncompliance.message.alertTitle'),
            detail: this.cs.L('message.duplicateData')
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('component.message.alertTitle'),
            detail: this.cs.L('message.unknowError')
          });
        }
      }
    );
  }

  /**
   * call service, post the form data to api
   */
  private create() {
    this.data.businessId = this.searchId;
    const updData: NoncomplianceDTO = this.data;
    // let continueFlg = false;
    if (this.data.closed || this.data.closed === 1) {

      // this.confirmationService.confirm({
      //   header: this.cs.L('alertTitle'),
      //   message: this.cs.L('noncompliance.message.closeComfirm'),
      //   icon: 'fa ui-icon-warning',
      //   accept: () => {
      //     continueFlg = true;
      //   }
      // });
      updData.closed = 1;
    } else {
      updData.closed = 0;
    }
    // if (!continueFlg && this.data.closed) {
    //   return ;
    // }
    this.ncService
      .saveNoncomplianceUsingPOST(updData)
      .subscribe(res => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: this.cs.L('message.addSuccess'),
          detail: this.cs.L('message.addSuccess')
        });
        this.close();
        this.reload.emit();
      },
      res => {
        if (res.error.code === 34002) {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('noncompliance.message.alertTitle'),
            detail: this.cs.L('message.duplicateData')
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('noncompliance.message.alertTitle'),
            detail: this.cs.L('message.unknowError')
          });
        }
      }
    );
  }

  /**
   * 下拉菜单初始化
   */
  dropdownInit() {
    this.ncTypeOptions = [];
    this.createByOptions = [];
    // dropdown init
    this.ncTypeService.findAllNctypeUsingGET().subscribe(
      (res) => {
        res.forEach(ele => {
          this.ncTypeOptions.push(
            {label: ele.typeName, value: ele.id}
          );
        });
      }
    );
    this.employeeControllerService.findAllEmployeeUsingGET().subscribe(
      (res) => {
        res.forEach(ele => {
          this.createByOptions.push(
            {label: ele.name, value: ele.eid}
          );
        });
      }
    );
  }

  /**
   * 输入Check
   */
  private inputCheck() {
    if (!this.data) {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('noncompliance.message.alertTitle'),
        detail: this.cs.L('message.inValidData')
      });
      return true;
    }
    //
    if (!this.data.nctypeId) {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('noncompliance.message.alertTitle'),
        detail: this.cs.L('noncompliance.message.ncTypeIsNotNull'),
      });
      return true;
    }

    if (!this.data.description) {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('noncompliance.message.alertTitle'),
        detail: this.cs.L('noncompliance.message.descriptionIsNotNull'),
      });
      return true;
    }
    return false;
  }
}
