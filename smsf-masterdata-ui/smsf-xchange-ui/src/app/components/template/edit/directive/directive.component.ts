import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MessageService} from "primeng/api";
import {CommonService} from "smsf-ui-layout";
import {
  DirectiveControllerService,
  DirectiveDTO,
  ElementDirectiveDTO,
  TemplateElementWithDirectiveDTO
} from "../../../../services/rest";

@Component({
  selector: 'app-template-editor-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.scss']
})
export class DirectiveComponent implements OnInit {
  isVisible: boolean = false;
  title: string = '';
  tableContent: ElementDirectiveDTO[] = [];
  tableSelected: ElementDirectiveDTO[] = [];
  directives: DirectiveDTO[] = [];
  finalInput: TemplateElementWithDirectiveDTO;
  propertyName: string = '';
  @Output() closed = new EventEmitter<TemplateElementWithDirectiveDTO>();

  constructor(public cs: CommonService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private directiveService: DirectiveControllerService) {
  }

  ngOnInit() {
  }

  open(input: TemplateElementWithDirectiveDTO) {
    this.finalInput = input;
    this.title = this.cs.L('template.edit.directive.title');
    const dto = JSON.parse(JSON.stringify(input));
    const businessProperty = dto.templateElement.businessProperty;
    if (businessProperty) {
      this.propertyName = businessProperty.name;
    }
    this.tableContent = dto.elementDirectives;
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
    this.closed.emit(this.finalInput)
  }

  addRow() {
    if (!this.tableContent) {
      this.tableContent = [];
    }
    this.tableContent.push({});
  }

  deleteRow(rowData: any) {
    let index = this.tableContent.indexOf(rowData);
    this.tableContent = this.tableContent.filter((val, i) => i != index);
  }

  save() {
    this.finalInput.elementDirectives = this.tableContent;
    this.close();
  }

  reset() {
    this.tableContent = this.finalInput.elementDirectives;
  }

  searchDirectives(event) {
    this.directiveService.queryDirectiveUsingGET(event.query)
      .subscribe(value => this.directives = value.list);
  }

}
