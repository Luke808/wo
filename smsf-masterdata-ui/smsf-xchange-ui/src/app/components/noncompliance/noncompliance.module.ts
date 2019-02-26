import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {
  AutoCompleteModule,
  ButtonModule,
  CalendarModule,
  DropdownModule,
  InputSwitchModule,
  InputTextareaModule,
  InputTextModule,
  MessageModule,
  MessagesModule,
  PanelModule,
  ScrollPanelModule,
  SpinnerModule,
  TooltipModule
} from 'primeng/primeng';
import {LayoutModule} from 'smsf-ui-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {FormatPipe} from './format.pipe';
import {EditComponent} from './edit/edit.component';

@NgModule({
  imports: [
    LayoutModule,
    InputSwitchModule,
    AutoCompleteModule,
    InputTextareaModule,
    ScrollPanelModule,
    SpinnerModule,
    CommonModule,
    ButtonModule,
    PanelModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    TooltipModule,
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
    MessagesModule,
    MessageModule
  ],
  declarations: [IndexComponent, EditComponent, FormatPipe],
  exports: [IndexComponent, EditComponent]
})
export class NoncomplianceModule {
}
