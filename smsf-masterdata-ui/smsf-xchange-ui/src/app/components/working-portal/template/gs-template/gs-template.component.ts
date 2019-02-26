import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {DataModel} from '../../core/data-model';
import {CommonService} from 'smsf-ui-layout';
import {MyTemplate} from '../../core/my-template';

@Component({
selector: 'app-working-portal-gs-template',
templateUrl: './gs-template.component.html'
})
export class GsTemplateComponent implements OnInit, MyTemplate {
isFormComponent: boolean;
@ViewChild('pTable') tableView: Table;
model: DataModel[];
selectedModel: DataModel[];
    string01: any;

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
