import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthCallbackComponent, AuthGuard, ErrorComponent} from 'smsf-ui-layout';
import {HomeComponent} from './components/home/home.component';
// import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
  {path: '', component: AuthCallbackComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {
    path: 'component',
    loadChildren: './components/component/component.module#ComponentModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'directive',
    loadChildren: './components/directive/directive.module#DirectiveModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'format-validation-rule',
    loadChildren: './components/format-validation-rule/format-validation-rule.module#FormatValidationRuleModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'business-object',
    loadChildren: './components/business-object/business-object.module#BusinessObjectModule',
    canActivate: [AuthGuard]
  },
  {path: 'template', loadChildren: './components/template/template.module#TemplateModule', canActivate: [AuthGuard]},
  {path: 'image-view', component: HomeComponent, canActivate: [AuthGuard]},
  {
    path: 'working-portal',
    loadChildren: './components/working-portal/working-portal.module#WorkingPortalModule', canActivate: [AuthGuard]
  },
  {
    path: 'working-list',
    loadChildren: './components/working-list/working-list.module#WorkingListModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'template-gen',
    loadChildren: './components/template-gen/template-gen.module#TemplateGenModule',
    canActivate: [AuthGuard]
  },
  {path: 'error', component: ErrorComponent},
  {path: 'error/:code', component: ErrorComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
