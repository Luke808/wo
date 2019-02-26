import {Component, Input, OnInit} from '@angular/core';
import {DataModel} from '../../core/data-model';
import {MyTemplate} from '../../core/my-template';

@Component({
selector: 'app-working-portal-FreightBillAudit-Solved',
templateUrl: './FreightBillAudit-Solved.component.html'
})
export class FreightbillauditSolvedComponent implements OnInit, MyTemplate {
isFormComponent:boolean;
isFullScreen: boolean = false;
model: DataModel;
    string03:any;
    string06:any;
    string19:any;
    string11:any;
    string24:any;
    string02:any;
    string09:any;
    string08:any;
    string12:any;
    string14:any;
    string20:any;
    string21:any;
    string22:any;
    string23:any;
    string04:any;
    string25:any;
    string26:any;
    string27:any;
    string28:any;
    string30:any;
    string29:any;
    number03:any;
    number05:any;
    string17:any;
    string18:any;

constructor() {
this.isFormComponent = true;
}

ngOnInit() {
if(!this.model){
this.model={};
}
    this.string03={
        parameterValue:{}


    };
    this.string06={
        parameterValue:{}


    };
    this.string19={
        parameterValue:{}


    };
    this.string11={
        parameterValue:{}


    };
    this.string24={
        parameterValue:{}


    };
    this.string02={
        parameterValue:{}


    };
    this.string09={
        parameterValue:{}


    };
    this.string08={
        parameterValue:{}


    };
    this.string12={
        parameterValue:{}


    };
    this.string14={
        parameterValue:{}


    };
    this.string20={
        parameterValue:{}


    };
    this.string21={
        parameterValue:{}


    };
    this.string22={
        parameterValue:{}


    };
    this.string23={
        parameterValue:{}


    };
    this.string04={
        parameterValue:{}


    };
    this.string25={
        parameterValue:{}


    };
    this.string26={
        parameterValue:{}


    };
    this.string27={
        parameterValue:{}


    };
    this.string28={
        parameterValue:{}


    };
    this.string30={
        parameterValue:{options:[{label: '高', value: 'H'},{label: '中', value: 'M'},{label: '低', value: 'L'}]},


    };
    this.string29={
        parameterValue:{}


    };
    this.number03={
        parameterValue:{}


    };
    this.number05={
        parameterValue:{}


    };
    this.string17={
        parameterValue:{}


    };
    this.string18={
        parameterValue:{}


    };
}
}
