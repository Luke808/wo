import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {CustomModule} from '../custom/custom.module';

import {
AutoCompleteModule,
CalendarModule,
CheckboxModule,
ChipsModule,
DropdownModule,
EditorModule,
InputSwitchModule,
InputTextareaModule,
InputTextModule,
ListboxModule,
PanelModule,
SpinnerModule,
ToggleButtonModule,
TooltipModule,
MessageModule
} from 'primeng/primeng';
import {FreightbillauditOpenedComponent} from './FreightBillAudit-Opened/FreightBillAudit-Opened.component';
import {TemplateThkComponent} from './template-thk/template-thk.component';
import {FreightbillauditInprocessComponent} from './FreightBillAudit-Inprocess/FreightBillAudit-Inprocess.component';
import {TemplateThkDetailComponent} from './template-thk-detail/template-thk-detail.component';
import {TemplateTestInputComponent} from './template-test-input/template-test-input.component';
import {FreightbillauditWaitingfor4plComponent} from './FreightBillAudit-Waitingfor4PL/FreightBillAudit-Waitingfor4PL.component';
import {GsTemplateComponent} from './gs-template/gs-template.component';
import {TemplateTestInput2Component} from './template-test-input2/template-test-input2.component';
import {FreightbillauditSolvedComponent} from './FreightBillAudit-Solved/FreightBillAudit-Solved.component';
import {TemplateTestInput3Component} from './template-test-input3/template-test-input3.component';

@NgModule({
imports: [
CommonModule,
FormsModule,
ReactiveFormsModule,
ButtonModule,
TableModule,
SpinnerModule,
PanelModule,
InputTextModule,
DropdownModule,
AutoCompleteModule,
TooltipModule,
CheckboxModule,
InputSwitchModule,
CalendarModule,
ToggleButtonModule,
InputTextareaModule,
ChipsModule,
ListboxModule,
EditorModule,
CustomModule,
MessageModule
],
declarations: [
    FreightbillauditOpenedComponent,
    TemplateThkComponent,
    FreightbillauditInprocessComponent,
    TemplateThkDetailComponent,
    TemplateTestInputComponent,
    FreightbillauditWaitingfor4plComponent,
    GsTemplateComponent,
    TemplateTestInput2Component,
    FreightbillauditSolvedComponent,
    TemplateTestInput3Component,
],
entryComponents: [
    FreightbillauditOpenedComponent,
    TemplateThkComponent,
    FreightbillauditInprocessComponent,
    TemplateThkDetailComponent,
    TemplateTestInputComponent,
    FreightbillauditWaitingfor4plComponent,
    GsTemplateComponent,
    TemplateTestInput2Component,
    FreightbillauditSolvedComponent,
    TemplateTestInput3Component,
],
})
export class TemplateModule {
}
