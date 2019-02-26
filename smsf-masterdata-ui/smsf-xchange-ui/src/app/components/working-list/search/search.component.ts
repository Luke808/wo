import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ISidebarSwitch, CommonService } from 'smsf-ui-layout';
import { MessageService, SelectItem } from 'primeng/api';
import {LocalStorage} from './../../../../app/shared/common/dataStore';
import { BusinessCaseService, BusinessCaseDTO, SearchOrderBy } from '../../../services/rest';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() closed: EventEmitter<any> = new EventEmitter();

  sidebarVisible = false;
  tableSelectedRows: any[];
  validationOptions: any[];
  i18n: any;

  // 查询条件
  searchDto: BusinessCaseDTO = {};
  searchAuthTypeOptions: SelectItem[];
  // s_searchAuthType: any;
  searchProcessOptions: SelectItem[] = [];
  searchStatusOptions: SelectItem[] = [];
  priorityOptions: SelectItem[];

  constructor(private messageService: MessageService,
    private localStorage: LocalStorage,
    private businessCaseService: BusinessCaseService,
    public cs: CommonService) { }

  ngOnInit() {
    this.searchAuthTypeOptions = [
      {label: this.cs.L('working-list.searchAuthTypeOptions.ALL'), value: 'ALL'},
      {label: this.cs.L('working-list.searchAuthTypeOptions.MYTASK'), value: 'MYTASK'}
      // {label: this.cs.L('working-list.searchAuthTypeOptions.OTHER'), value: 'OTHER'},
      // {label: this.cs.L('working-list.searchAuthTypeOptions.UNDEAL'), value: 'UNDEAL'}
    ];
    this.priorityOptions = [
      {label: 'ALL', value: ''},
      {label: 'LOW', value: 'LOW'},
      {label: 'MIDDLE', value: 'MIDDLE'},
      {label: 'HIGH', value: 'HIGH'}
    ];
    this.initSearchProcessOptions();
  }
  open() {
    this.sidebarVisible = true;
    // 获取存储的查询条件
    this.searchDto = this.localStorage.getObject('businessCaseSearch_condition');
    // console.log('获取查询条件' + JSON.stringify(this.searchDto));
  }
  close() {
    this.sidebarVisible = false;
  }
  reset() {
    this.searchDto = {};
    // 设置并存储查询条件
    this.localStorage.setObject('businessCaseSearch_condition', this.searchDto);
    // console.log('reset 查询条件' + JSON.stringify(this.searchDto));
  }
  search() {
    this.close();
    // this.searchDto.searchAuthType = this.s_searchAuthType;
    this.closed.emit(this.searchDto);
  }
  changeSearchAuthTypeOptions(event) {
    // this.search();
  }

  initSearchProcessOptions() {
    this.businessCaseService.getProcessListUsingGET().subscribe(res => {
      res.map(dto => {
        const option = {
          label: dto.name,
          value: dto.id
        };
        this.searchProcessOptions.push(option);
      });
    });
  }
  changeSearchProcessOptions(event) {
    this.initSearchStatusOptions(event.value);
  }

  initSearchStatusOptions(processId) {
    this.businessCaseService.getStatusListUsingGET(processId).subscribe(res => {
      res.map(dto => {
        const option = {
          label: dto.businessStatusName,
          value: dto.businessStatusId
        };
        this.searchStatusOptions.push(option);
      });
    });
  }
  changeSearchStatusOptions(event) {
    // console.log('change status')
  }
}
