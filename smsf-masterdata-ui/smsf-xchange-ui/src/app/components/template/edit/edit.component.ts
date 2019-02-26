import {Component, OnInit, ViewChild} from '@angular/core';
import {
  BusinessObjectDTO,
  BusinessObjectService,
  BusinessPropertyDTO,
  ComponentControllerService,
  ComponentDTO,
  ElementDirectiveDTO,
  ModuleTemplateInDTO,
  ModuleTemplateOutDTO,
  ProcessControllerService,
  ProcessDTO,
  StepDTO,
  TemplateControllerService,
  TemplateElementWithDirectiveDTO,
} from '../../../services/rest';
import {ConfirmationService, LazyLoadEvent, MessageService, SelectItem} from 'primeng/api';
import {CommonService} from 'smsf-ui-layout';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormBuilder, FormGroup, NgModel, Validators} from '@angular/forms';
import {Table} from 'primeng/table';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {DirectiveComponent} from './directive/directive.component';

@Component({
  selector: 'app-template-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  isStartLoadingData = false;
  @ViewChild(Table) tableView: Table;
  @ViewChild(DirectiveComponent) sidebar: DirectiveComponent;
  request$: Observable<ModuleTemplateOutDTO>;
  form: FormGroup;
  model: ModuleTemplateOutDTO;
  tableContent: TemplateElementWithDirectiveDTO[];
  tableSelected: TemplateElementWithDirectiveDTO[];
  businessObjectOptions: BusinessObjectDTO[];
  businessPropertyOptions: BusinessPropertyDTO[];
  componentOptions: ComponentDTO[];
  widthOptions: SelectItem[];
  processOptions: ProcessDTO[];
  stepOptions: StepDTO[];
  layoutOptions: SelectItem[];
  text: string;
  id: string;
  lastSelectedBusinessObject: any;
  lastSelectedProcess: any;
  errorMsg: any;

  constructor(public cs: CommonService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private router: Router,
              private ar: ActivatedRoute,
              private service: TemplateControllerService,
              private objectService: BusinessObjectService,
              private componentService: ComponentControllerService,
              private processService: ProcessControllerService) {
  }

  ngOnInit() {
    this.model = {};
    this.errorMsg = {};
    this.form = this.fb.group({
      id: [null],
      layout: [null, [Validators.required, Validators.maxLength(45)]],
      componentName: [null, [Validators.required, Validators.maxLength(45)]],
      name: [null, [Validators.required, Validators.maxLength(45)]],
      businessObject: [null, [Validators.required]],
      process: [null, [Validators.required]],
      steps: [null],
      description: [null, [Validators.maxLength(255)]],
      enable: [null],
      elements: this.fb.array([{}]),
    });
    this.request$ = this.ar.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        if (this.id) {
          return this.service.findTemplateByIdUsingGET(this.id);
        } else {
          return of({});
        }
      }));
    this.request$.subscribe(value => {
      this.model.template = value.template;
      this.model.process = value.process;
      this.model.steps = value.steps;
      this.isStartLoadingData = true;
      this.tableView.reset();
      this.patchValue();
    });
    this.widthOptions = [
      {label: '1', value: 1},
      {label: '2', value: 2},
      {label: '3', value: 3},
      {label: '4', value: 4},
      {label: '6', value: 6}
    ];
    this.layoutOptions = [
      {label: 'Form', value: 'FORM'},
      {label: 'Table', value: 'TABLE'}
    ];
  }

  patchValue() {
    if (!this.model.template) {
      this.model.template = {};
    }
    this.form.patchValue({
      id: this.id,
      layout: this.model.template.layout ? this.model.template.layout : 'FORM',
      componentName: this.model.template.componentName,
      name: this.model.template.name,
      businessObject: this.model.template.businessObject,
      description: this.model.template.description,
      enable: this.model.template.enable ? this.model.template.enable : false,
      process: this.model.process,
      steps: this.model.steps,
    });
  }


  lazyLoad(event: LazyLoadEvent) {
    this.data();
  }

  data() {
    if (!this.id) {
      return;
    }
    this.service.queryElementWithDirectiveUsingGET(this.id)
      .subscribe(
        (value) => {
          this.tableContent = value;
        },
        () => {
        },
        () => {
        }
      );
  }

  save() {
    let stepIds;
    if (this.form.value.steps) {
      stepIds = this.form.value.steps.map(value => value.id);
    }

    const template: ModuleTemplateInDTO = {
      template: this.form.value,
      elements: this.tableContent,
      stepIds: stepIds,
      processId: this.form.value.process.id
    };
    if (this.id) {
      this.service.updateTemplateUsingPATCH(template, this.id)
        .subscribe(value => this.return());
    } else {

      this.service.saveTemplateUsingPOST(template)
        .subscribe(value => {
          this.return();
        });
    }

  }

  delete() {
    this.confirmationService.confirm({
      header: this.cs.L('delete'),
      message: this.cs.L('message.deleteConfirmation', {name: this.model.template.name}),
      icon: 'fa ui-icon-warning',
      accept: () => {
        this.service.deleteTemplateUsingDELETE(this.id)
          .subscribe(
            value => {
              this.messageService.add({
                severity: 'success',
                summary: this.cs.L('delete'),
                detail: this.cs.L('message.deleteSuccessful')
              });
              this.return();
            },
            () => this.messageService.add({
              severity: 'error',
              summary: this.cs.L('delete'),
              detail: this.cs.L('message.deleteFailed')
            }),
            () => {

            });
      }
    });
  }

  return() {
    this.router.navigate(['../list'], {relativeTo: this.ar});
  }

  flush() {
    this.tableView.reset();
  }

  addRow() {
    if (!this.form.get('businessObject').value || this.isControlInvalid('businessObject')) {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('message.error'),
        detail: this.cs.L('template.message.selectBusinessObjectFirst')
      });
      return;
    }


    if (!this.tableContent) {
      this.tableContent = [];
    }
    this.tableContent.push({
      templateElement: {},
      elementDirectives: []
    });
  }

  deleteRow(rowData: any) {
    const index = this.tableContent.indexOf(rowData);
    this.tableContent = this.tableContent.filter((val, i) => i !== index);
  }


  searchBusinessObject(event) {
    this.objectService.queryBusinessObjectByNameUsingGET(event.query)
      .subscribe(value => {
        if (value) {
          this.businessObjectOptions = value;
        } else {
          this.businessObjectOptions = [];
        }
      });
  }

  onSelectBusinessObject(value) {
    if (value.id !== (this.lastSelectedBusinessObject ? this.lastSelectedBusinessObject.id : null)) {
      this.lastSelectedBusinessObject = value;
      this.tableContent = [];
    }
  }


  searchBusinessProperty(event) {
    this.objectService.queryBusinessPropertyByObjectIdAndPropertyNameUsingGET(this.form.get('businessObject').value.id, event.query)
      .subscribe(value => {
        if (value) {
          this.businessPropertyOptions = value;
        } else {
          this.businessPropertyOptions = [];
        }
      });
  }

  onSelectBusinessProperty(event) {

  }

  searchComponents(event) {
    this.componentService.queryComponentUsingGET(event.query)
      .subscribe(value => {
        if (value) {
          this.componentOptions = value.list;
        } else {
          this.componentOptions = [];
        }
      });
  }

  onSelectComponent(event) {

  }

  searchProcess(event) {
    this.processService.findAllProcessByNameUsingGET(event.query)
      .subscribe(value => {
        if (value) {
          this.processOptions = value;
        } else {
          this.processOptions = [];
        }
      });
  }

  onSelectProcess(value) {
    if (value.id !== (this.lastSelectedProcess ? this.lastSelectedProcess.id : null)) {
      this.lastSelectedProcess = value;
      this.form.patchValue({
        steps: null
      });
    }
  }


  searchSteps(event) {
    const selectedProcess = this.form.get('process').value;
    if (!selectedProcess) {
      this.messageService.add({
        severity: 'error',
        summary: this.cs.L('message.error'),
        detail: this.cs.L('template.message.selectProcessObjectFirst')
      });
      return;
    } else {
      this.processService.findAllStepsByProcessIdAndNameUsingGET(selectedProcess.id, event.query)
        .subscribe(value => {
          if (value) {
            this.stepOptions = value;
          } else {
            this.stepOptions = [];
          }
        });
    }
  }

  directive(rowData: any) {
    this.sidebar.open(rowData);
  }

  sidebarClosed(rowData) {
    this.tableContent.find(value => {
      return value.templateElement === rowData.templateElement;
    }).elementDirectives = rowData.elementDirectives;
  }


  propertyName(dtos: Array<ElementDirectiveDTO>): string {
    return dtos.map(value => {
      if (value.directive) {
        return value.directive.name;
      }
    }).join(',');
  }

  isControlInvalid(control: string | NgModel): boolean {
    let formControl;
    let controlName;
    if (typeof control === 'string') {
      formControl = this.form.controls[control];
      controlName = control;
    } else {
      formControl = control;
      controlName = control.name;
    }

    const invalid = formControl.invalid && (formControl.dirty || formControl.touched);
    if (invalid) {
      if (formControl.errors.required) {
        this.errorMsg[controlName] = this.cs.L('template.message.required');
      } else if (formControl.errors.maxlength) {
        this.errorMsg[controlName] = this.cs.L('template.message.maxLength');
      } else if (formControl.errors.minlength) {
        this.errorMsg[controlName] = this.cs.L('template.message.minLength');
      }
    }
    return invalid;
  }
}
