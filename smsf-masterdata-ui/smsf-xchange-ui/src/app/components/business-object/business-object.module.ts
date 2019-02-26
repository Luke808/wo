import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TreeTableModule} from 'primeng/treetable';
import { BusinessObjectRoutingModule } from './business-object-routing.module';
import { IndexComponent } from './index/index.component';
import { LayoutModule } from 'smsf-ui-layout';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';
import { EditComponent } from './edit/edit.component';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import { CodeTable } from './../../../app/shared/common/codetable';
import { ValidationSettingComponent } from './validation-setting/validation-setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/primeng';
import {PanelModule, ScrollPanelModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    BusinessObjectRoutingModule,
    TreeTableModule,
    LayoutModule,
    LayoutModule,
    FormsModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    SidebarModule,
    InputTextModule,
    ConfirmDialogModule,
    InputSwitchModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    CardModule,
    ReactiveFormsModule,
    TooltipModule,
    PanelModule, ScrollPanelModule
  ],
  declarations: [IndexComponent, EditComponent, ValidationSettingComponent],
  providers: [
    CodeTable
  ]
})
export class BusinessObjectModule { }
