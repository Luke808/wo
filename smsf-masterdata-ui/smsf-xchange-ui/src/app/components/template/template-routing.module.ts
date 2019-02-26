import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TempalteComponent} from './tempalte.component';
import {IndexComponent} from './index/index.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: TempalteComponent,
    children: [
      {path: '', redirectTo: 'list'},
      {path: 'list', component: IndexComponent},
      {path: 'new', component: EditComponent},
      {path: ':id', component: EditComponent, data: {title: 'Title'}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule {
}
