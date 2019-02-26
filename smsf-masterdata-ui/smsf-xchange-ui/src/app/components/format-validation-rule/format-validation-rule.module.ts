import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatValidationRuleRoutingModule } from './format-validation-rule-routing.module';
import { IndexComponent } from './index/index.component';
import { LayoutModule } from 'smsf-ui-layout';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormatValidationRuleRoutingModule,
    LayoutModule,
    FormsModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    SidebarModule,
    InputTextModule,
    InputTextareaModule,
    ConfirmDialogModule,
    InputSwitchModule,
    DropdownModule,
    CalendarModule
  ],
  declarations: [IndexComponent, EditComponent]
})
export class FormatValidationRuleModule { }
