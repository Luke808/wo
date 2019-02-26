import {Component, Input, OnInit} from '@angular/core';
import {DataModel} from '../../core/data-model';
import {MyTemplate} from '../../core/my-template';

@Component({
selector: 'app-working-portal-template-test-input',
templateUrl: './template-test-input.component.html'
})
export class TemplateTestInputComponent implements OnInit, MyTemplate {
isFormComponent:boolean;
isFullScreen: boolean = false;
model: DataModel;
    string01:any;
    number01:any;
    string04:any;
    string05:any;
    string06:any;

constructor() {
this.isFormComponent = true;
}

ngOnInit() {
if(!this.model){
this.model={};
}
    this.string01={
        parameterValue:{}


    };
    this.number01={
        parameterValue:{}


    };
    this.string04={
        parameterValue:{}


    };
    this.string05={
        parameterValue:{}


    };
    this.string06={
        parameterValue:{url:'http://smsf-masterdata-service-uat/masterdata/process/list'},


    };
}
}
