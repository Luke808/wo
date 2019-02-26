import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AttachmentComponent} from './attachment/attachment.component';

const routes: Routes = [
  {path: 'attachment', component: AttachmentComponent},
  {path: ':id', component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingPortalRoutingModule {
}
