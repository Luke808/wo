import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ISidebarSwitch, CommonService } from 'smsf-ui-layout';
import { MessageService } from 'primeng/api';
import { ComponentControllerService } from 'src/app/services/rest/api/api';
import { ComponentDTO } from 'src/app/services/rest/model/componentDTO';

@Component({
  selector: 'app-component-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, ISidebarSwitch {

  @Output() reload = new EventEmitter();

  sidebarVisible = false;
  data: ComponentDTO = {};
  id: string;
  i18n: any;

  constructor(private componentControllerService: ComponentControllerService,
    private messageService: MessageService,
    public cs: CommonService) { }

  ngOnInit() {
  }

    /**
   * Open the component edit form
   * if id has value then edit else create
   * @param id component id
   */
  open(id?: any) {
    if (id) {
      // get by id
      this.componentControllerService.findComponentByIdUsingGET(id).subscribe(
        value => {
          this.data = value;
          this.id = id;
        },
        res => {
          if (res.error.code === 34000) {
            this.messageService.add({
              severity: 'error',
              summary: this.cs.L('component.message.alertTitle'),
              detail: this.cs.L('message.noSuchData')
              });
            this.reload.emit();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: this.cs.L('component.message.alertTitle'),
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
   * close the component edit form
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
        summary: this.cs.L('component.message.alertTitle'),
        detail: this.cs.L('message.inValidData')
      });
      return;
    }

    if (!this.data.name) {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('component.message.alertTitle'),
        detail: this.cs.L('component.message.nameIsNotNull'),
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
    this.componentControllerService
      .updateComponentUsingPOST(this.data)
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
            summary: this.cs.L('component.message.alertTitle'),
            detail: this.cs.L('message.noSuchData')
          });
        } else if (res.error.code === 34002) {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('component.message.alertTitle'),
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
    this.componentControllerService
      .createComponentUsingPOST(this.data)
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
            summary: this.cs.L('component.message.alertTitle'),
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

}
