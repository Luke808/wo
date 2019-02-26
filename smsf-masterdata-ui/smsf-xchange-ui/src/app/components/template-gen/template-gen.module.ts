import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TemplateGenRoutingModule} from './template-gen-routing.module';
import {IndexComponent} from './index/index.component';
import {ButtonModule, ProgressBarModule} from "primeng/primeng";

@NgModule({
  imports: [
    CommonModule,
    TemplateGenRoutingModule,
    ProgressBarModule,
    ButtonModule,
  ],
  declarations: [IndexComponent]
})
export class TemplateGenModule {
}
