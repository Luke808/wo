import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountDownComponent} from './count-down/count-down.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataSourceDirective} from './data-source.directive';
import {InputTextModule} from 'primeng/primeng';
import {BindDirective} from './bind.directive';
import {SplitPipe} from './split.pipe';
import {JoinPipe} from './join.pipe';
import {AnchorDirective} from './anchor.directive';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule
  ],
  declarations: [CountDownComponent, DataSourceDirective, BindDirective, SplitPipe, JoinPipe, AnchorDirective],
  exports: [CountDownComponent, DataSourceDirective, BindDirective, SplitPipe, JoinPipe, AnchorDirective]
})
export class CustomModule {
}
