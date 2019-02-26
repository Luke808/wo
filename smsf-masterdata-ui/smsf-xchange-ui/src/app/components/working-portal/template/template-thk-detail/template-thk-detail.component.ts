import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {DataModel} from '../../core/data-model';
import {CommonService} from 'smsf-ui-layout';
import {MyTemplate} from '../../core/my-template';

@Component({
selector: 'app-working-portal-template-thk-detail',
templateUrl: './template-thk-detail.component.html'
})
export class TemplateThkDetailComponent implements OnInit, MyTemplate {
isFormComponent: boolean;
@ViewChild('pTable') tableView: Table;
model: DataModel[];
selectedModel: DataModel[];
    string01: any;
    string02: any;
    string03: any;
    string04: any;

constructor(public cs: CommonService) {
this.isFormComponent = false;
}

ngOnInit() {
if (!this.model) {
this.model = [];
}
    this.string01 = {
        parameterValue: {}


    };
    this.string02 = {
        parameterValue: {}


    };
    this.string03 = {
        parameterValue: {}


    };
    this.string04 = {
        parameterValue: {}


    };
}

flush() {
this.tableView.reset();
}

addRow() {
if (!this.model) {
this.model = [];
}
this.model.push({});
}

deleteRow(rowData: any) {
let index;
index = this.model.indexOf(rowData);
this.model = this.model.filter((val, i) => i !== index);
}

}
