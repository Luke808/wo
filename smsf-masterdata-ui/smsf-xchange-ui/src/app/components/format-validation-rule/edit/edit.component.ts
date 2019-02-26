import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonService} from 'smsf-ui-layout';
import {MessageService, SelectItem} from 'primeng/api';
import {ValidationRuleControllerService} from 'src/app/services/rest/api/api';
import {FormatValidationRuleDTO} from 'src/app/services/rest/model/formatValidationRuleDTO';

@Component({
  selector: 'app-format-validation-rule-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


  @Output() reload = new EventEmitter();

  sidebarVisible = false;
  data: FormatValidationRuleDTO = {};
  id: string;
  i18n: any;

  validateTypes: SelectItem[];

  constructor(private validationRuleControllerService: ValidationRuleControllerService,
    private messageService: MessageService,
    public cs: CommonService) {
      this.validateTypes = [
        {label: 'Regex', value: 'Regex'},
        {label: 'Service', value: 'Service'}
      ];
    }

  ngOnInit() {
  }

    /**
   * Open the rule edit form
   * if id has value then edit else create
   * @param id rule id
   */
  open(id?: any) {
    if (id) {
      // get by id
      this.validationRuleControllerService.findValidationRuleByIdUsingGET(id).subscribe(
        value => {
          this.data = value;
          this.id = id;
          if (!this.data.validateType) {
            this.data.validateType = this.validateTypes[0].value;
          }
        },
        res => {
          if (res.error.code === 34000) {
            this.messageService.add({
              severity: 'error',
              summary: this.cs.L('formatValidationRule.message.alertTitle'),
              detail: this.cs.L('message.noSuchData')
              });
            this.reload.emit();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: this.cs.L('formatValidationRule.message.alertTitle'),
              detail: this.cs.L('message.unknowError')
            });
          }
        }
      );
    } else {
      this.data = {};
      this.data.validateType = this.validateTypes[0].value;
      this.id = undefined;
    }
    this.sidebarVisible = true;
  }

  /**
   * close the rule edit form
   */
  close() {
    this.sidebarVisible = false;
  }

  /**
   * if id has value then update else create
   */
  save() {
    if (!this.data) {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('formatValidationRule.message.alertTitle'),
        detail: this.cs.L('message.inValidData')
      });
      return;
    }

    if (!this.data.name) {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('formatValidationRule.message.alertTitle'),
        detail: this.cs.L('formatValidationRule.message.nameIsNotNull'),
      });
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
    this.validationRuleControllerService
      .updateValidationRuleUsingPOST(this.data)
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
            summary: this.cs.L('formatValidationRule.message.alertTitle'),
            detail: this.cs.L('message.noSuchData')
          });
        } else if (res.error.code === 34002) {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('formatValidationRule.message.alertTitle'),
            detail: this.cs.L('message.duplicateData')
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('formatValidationRule.message.alertTitle'),
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
    this.validationRuleControllerService
      .createValidationRuleUsingPOST(this.data)
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
            summary: this.cs.L('formatValidationRule.message.alertTitle'),
            detail: this.cs.L('message.duplicateData')
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('formatValidationRule.message.alertTitle'),
            detail: this.cs.L('message.unknowError')
          });
        }
      }
    );
  }

}
