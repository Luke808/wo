import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {CommonService} from 'smsf-ui-layout';
import {ActivatedRoute, Router} from '@angular/router';
import {
  BusinessCaseDTO,
  BusinessCaseService,
  WorkingPortalControllerService,
  WorkingPortalDTO,
  XchangeControllerService,
  XChangeDTO
} from '../../../services/rest';
import {ConfirmationService, Message, MessageService} from 'primeng/api';
import {WorkingPortalService} from '../working-portal.service';
import {OptComponent} from '../opt/opt.component';
import {LocalStorage} from '../../../shared/common/dataStore';
import {timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-working-portal',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  id: string;
  workingPortalDTO: WorkingPortalDTO;
  showMedia: boolean;
  isDoingTask: boolean;
  @ViewChild(OptComponent) optComponent: OptComponent;
  msgs: Message[] = [];
  hasPermission: boolean;

  constructor(public cs: CommonService,
              private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private workingPortalControllerService: WorkingPortalControllerService,
              private workingPortalService: WorkingPortalService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private service: XchangeControllerService,
              private localStorage: LocalStorage,
              private businessCaseService: BusinessCaseService) {
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    this.hasPermission = false;
    this.showMedia = false;
    this.route.paramMap.pipe(
      switchMap(paramMap => {
        this.id = paramMap.get('id');
        return this.workingPortalControllerService.indexUsingGET(this.id);
      })
    ).subscribe(value => {
      this.workingPortalDTO = value;
      this.hasPermission = this.workingPortalDTO.hasPermission;
      this.workingPortalService.setWorkingPortalDTO(this.workingPortalDTO);
      this.workingPortalService.setFullScreen(!this.showMedia);
      this.isDoingTask = !this.workingPortalDTO.businessCase.isPendding;
    }, e => {
      const error = e.error;
      this.msgs.push({
        severity: 'error',
        summary: this.cs.L('message.error'),
        detail: this.cs.L('message.errorCode.'.concat(error.code))
      });
      timer(3000).subscribe(value => {
        this.return();
      });
    });
  }

  return() {
    this.router.navigate(['/working-list']);
  }

  switch() {
    this.showMedia = !this.showMedia;
    console.log('full screen', this.showMedia);
    this.workingPortalService.setFullScreen(!this.showMedia);
  }

  switchStatus(event) {
    const dto: BusinessCaseDTO = {
      id: this.id,
      transactionId: this.workingPortalDTO.businessCase.transactionId
    };
    this.service.pauseOrResumeUsingPOST(dto).subscribe(value => {
        this.messageService.add({
          severity: 'success',
          summary: this.cs.L('message.success'),
          detail: this.cs.L('message.operationSuccess')
        });
        this.isDoingTask = !value;
        this.workingPortalDTO.businessCase.isPendding = value;
      },
      e => {
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('message.fail'),
          detail: this.cs.L('message.operationFail')
        });
      },
      () => {
      });
  }

  transfer() {
    const dto: BusinessCaseDTO = {
      id: this.id,
      transactionId: this.workingPortalDTO.businessCase.transactionId
    };
    this.service.transferUsingPOST(dto).subscribe(value => {
        if (value) {
          this.messageService.add({
            severity: 'success',
            summary: this.cs.L('message.success'),
            detail: this.cs.L('message.operationSuccess')
          });
          this.router.navigate(['/working-list']);
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
          detail: this.cs.L('message.operationFail')
        });
      },
      () => {
      });
  }

  reassign() {
    const dto: BusinessCaseDTO = {
      id: this.id,
      transactionId: this.workingPortalDTO.businessCase.transactionId
    };
    this.service.reassignUsingPOST(dto).subscribe(value => {
        if (value) {
          this.messageService.add({
            severity: 'success',
            summary: this.cs.L('message.success'),
            detail: this.cs.L('message.operationSuccess')
          });
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
          detail: this.cs.L('message.operationFail')
        });
      },
      () => {
      });
  }

  terminate() {
    const dto: BusinessCaseDTO = {
      id: this.id,
      transactionId: this.workingPortalDTO.businessCase.transactionId
    };
    this.service.terminateUsingPOST(dto).subscribe(value => {
        if (value) {
          this.messageService.add({
            severity: 'success',
            summary: this.cs.L('message.success'),
            detail: this.cs.L('message.operationSuccess')
          });
          this.router.navigate(['/working-list']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('message.fail'),
            detail: this.cs.L('message.errorCode.')
          });
        }
      },
      e => {
        this.messageService.add({
          severity: 'error',
          summary: this.cs.L('message.fail'),
          detail: this.cs.L('message.operationFail')
        });
      },
      () => {
      });
  }

  save() {
    const dto: XChangeDTO = {
      businessCase: {
        id: this.id,
        transactionId: this.workingPortalDTO.businessCase.transactionId
      },
      businessDataList: this.optComponent.getBusinessDataList()
    };
    this.service.saveUsingPOST(dto).subscribe(
      value => {
        if (value) {
          this.messageService.add({
            severity: 'success',
            summary: this.cs.L('message.success'),
            detail: this.cs.L('message.operationSuccess')
          });
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
          detail: this.cs.L('message.operationFail')
        });
      },
      () => {
      });
  }

  commit() {
    const dto: XChangeDTO = {
      businessCase: {
        id: this.id,
        transactionId: this.workingPortalDTO.businessCase.transactionId
      },
      businessDataList: this.optComponent.getBusinessDataList()
    };
    this.service.commitUsingPOST(dto).subscribe(
      value => {
        if (value) {
          const searchDto = this.localStorage.getObject('businessCaseSearch_condition');
          this.businessCaseService.nextBusinessCaseUsingPOST(searchDto).subscribe(
            res => {
              console.log('res', res);
              this.confirmationService.confirm({
                header: this.cs.L('success'),
                message: res ? this.cs.L('working-portal.message.nextConfirmWithNewTask') :
                  this.cs.L('working-portal.message.nextConfirmWithoutTask'),
                icon: 'fa ui-icon-warning',
                accept: () => {
                  if (res) {
                    this.router.navigate(['/working-portal', res.id]);
                  } else {
                    this.router.navigate(['/working-list']);
                  }
                },
                reject: () => {
                  this.router.navigate(['/working-portal', this.id]);
                }
              });
            });
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
          detail: this.cs.L('message.operationFail')
        });
      },
      () => {

      });
  }
}
