import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonService, ISidebarSwitch, firstRowToPage } from 'smsf-ui-layout';
import { MessageService, SelectItem } from 'primeng/api';
import { BusinessCaseService, BusinessCaseDTO, SearchOrderBy, EmployeeDto } from '../../../services/rest';

@Component({
  selector: 'app-select-person',
  templateUrl: './select-person.component.html',
  styleUrls: ['./select-person.component.scss']
})
export class SelectPersonComponent implements OnInit {
  @Output() persons: EventEmitter<any> = new EventEmitter();

  constructor(private messageService: MessageService,
    private businessCaseService: BusinessCaseService,
    public cs: CommonService) { }

  sidebarVisible = false;
  totalRecords: number;
  page = 1;
  pageSize = 10;
  first = 0;
  loading = false;
  tableSelectedRows: any[];
  tableData: any[];
  i18n: any;

  eid: string;
  name: string;
  selectedNodes: EmployeeDto[] = [];
  selectedCaseNodes: BusinessCaseDTO[] = [];

  ngOnInit() {
  }

  loadPage(event) {
    this.page = firstRowToPage(event.first, event.rows);
    this.filter();
  }
  filter() {
    if (this.selectedCaseNodes && this.selectedCaseNodes.length > 0) {
      this.loading = true;
      this.businessCaseService.selectPersonsUsingPOST(
        this.selectedCaseNodes, this.eid, this.name, this.page, this.pageSize).subscribe(
        res => {
          this.tableData = res.list;
          this.first = res.startRow;
          this.totalRecords = res.total;
          this.loading = false;
        }, error => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: this.cs.L('xchange.message.alertTitle'),
            detail: this.cs.L('message.errorCode.'.concat(error.error.code))
          });
        }
      );
    }
  }
  open(selectedCaseNodes: BusinessCaseDTO[]) {
    this.selectedCaseNodes = selectedCaseNodes;
    this.sidebarVisible = true;
    this.filter();
  }
  close() {
    this.eid = null;
    this.name = null;
    this.selectedNodes = [];
    this.sidebarVisible = false;
  }

  bantchReassign() {
    this.close();
    // this.searchDto.searchAuthType = this.s_searchAuthType;
    this.persons.emit(this.selectedNodes);
  }
}
