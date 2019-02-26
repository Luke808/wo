import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkingListRoutingModule } from './working-list-routing.module';
import { IndexComponent } from './index/index.component';

import { LayoutModule } from 'smsf-ui-layout';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule, PanelModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';
import { SearchComponent } from './search/search.component';
import {LocalStorage} from './../../../app/shared/common/dataStore';
import {CheckboxModule} from 'primeng/checkbox';
import { SelectPersonComponent } from './select-person/select-person.component';
@NgModule({
  imports: [
    CommonModule,
    WorkingListRoutingModule,
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
    PanelModule,
    CheckboxModule
  ],
  declarations: [IndexComponent, SearchComponent, SelectPersonComponent],
  providers: [LocalStorage],
})
export class WorkingListModule { }

