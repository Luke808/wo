import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ISidebarSwitch, CommonService } from 'smsf-ui-layout';
import { MessageService } from 'primeng/api';
import { DirectiveDTO } from 'src/app/services/rest/model/directiveDTO';
import { DirectiveControllerService } from 'src/app/services/rest/api/directiveController.service';

@Component({
  selector: 'app-directive-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Output() reload = new EventEmitter();

  sidebarVisible = false;
  data: DirectiveDTO = {};
  id: string;
  i18n: any;

  constructor(private directiveControllerService: DirectiveControllerService,
    private messageService: MessageService,
    public cs: CommonService) { }

  ngOnInit() {
  }

    /**
   * Open the directive edit form
   * if id has value then edit else create
   * @param id directive id
   */
  open(id?: any) {
    if (id) {
      // get by id
      this.directiveControllerService.findDirectiveByIdUsingGET(id).subscribe(
        value => {
          this.data = value;
          this.id = id;
        },
        res => {
          if (res.error.code === 34000) {
            this.messageService.add({
              severity: 'error',
              summary: this.cs.L('directive.message.alertTitle'),
              detail: this.cs.L('message.noSuchData')
              });
            this.reload.emit();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: this.cs.L('directive.message.alertTitle'),
              detail: this.cs.L('message.unknowError')
            });
          }
        }
      );
    } else {
      this.data = {};
      this.id = undefined;
    }
    this.sidebarVisible = true;
  }

  /**
   * close the directive edit form
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
        summary: this.cs.L('directive.message.alertTitle'),
        detail: this.cs.L('message.inValidData')
      });
      return;
    }

    if (!this.data.name) {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('directive.message.alertTitle'),
        detail: this.cs.L('directive.message.nameIsNotNull'),
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
    this.directiveControllerService
      .updateDirectiveUsingPOST(this.data)
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
            summary: this.cs.L('directive.message.alertTitle'),
            detail: this.cs.L('message.noSuchData')
          });
        } else if (res.error.code === 34002) {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('directive.message.alertTitle'),
            detail: this.cs.L('message.duplicateData')
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('directive.message.alertTitle'),
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
    this.directiveControllerService
      .createDirectiveUsingPOST(this.data)
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
            summary: this.cs.L('directive.message.alertTitle'),
            detail: this.cs.L('message.duplicateData')
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('directive.message.alertTitle'),
            detail: this.cs.L('message.unknowError')
          });
        }
      }
    );
  }

}
