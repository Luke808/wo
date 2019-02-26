import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TemplateRoutingModule} from './template-routing.module';
import {IndexComponent} from './index/index.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from 'smsf-ui-layout';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {
  AutoCompleteModule,
  DropdownModule,
  InputSwitchModule,
  InputTextareaModule,
  InputTextModule,
  MessageModule,
  PanelModule,
  ScrollPanelModule,
  SpinnerModule,
  TooltipModule,
} from 'primeng/primeng';
import {TempalteComponent} from './tempalte.component';
import {EditComponent} from './edit/edit.component';
import {DirectiveComponent} from './edit/directive/directive.component';
import {TemplateService} from './template.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    TooltipModule,
    ScrollPanelModule,
    TableModule,
    ButtonModule,
    PanelModule,
    AutoCompleteModule,
    InputTextModule,
    SpinnerModule,
    InputSwitchModule,
    InputTextareaModule,
    DropdownModule,
    TemplateRoutingModule,
    MessageModule
  ],
  declarations: [IndexComponent, TempalteComponent, EditComponent, DirectiveComponent],
  providers: [TemplateService]
})
export class TemplateModule {
}
