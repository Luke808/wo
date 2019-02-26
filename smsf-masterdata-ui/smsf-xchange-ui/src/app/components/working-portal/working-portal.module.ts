import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkingPortalRoutingModule} from './working-portal-routing.module';
import {IndexComponent} from './index/index.component';
import {LayoutModule} from 'smsf-ui-layout';
import {ButtonModule} from 'primeng/button';
import {OptComponent} from './opt/opt.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MediaComponent} from './media/media.component';
import {TemplateModule} from './template/template.module';
import {InputTextModule, MessagesModule, PanelModule, ToggleButtonModule} from 'primeng/primeng';
import {WorkingPortalService} from './working-portal.service';
import {LocalStorage} from '../../shared/common/dataStore';
import {NoncomplianceModule} from '../noncompliance/noncompliance.module';
import {CommonInfoComponent} from './opt/common-info/common-info.component';
import {AttachmentComponent} from './attachment/attachment.component';
import {TableModule} from 'primeng/table';
import {SidebarModule} from 'primeng/sidebar';
import {FileUploadModule} from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';
import {CustomModule} from './custom/custom.module';

@NgModule({
  imports: [
    WorkingPortalRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TemplateModule,
    LayoutModule,
    CustomModule,
    ButtonModule,
    ToggleButtonModule,
    PanelModule,
    InputTextModule,
    MessagesModule,
    NoncomplianceModule,
    TableModule,
    SidebarModule,
    FileUploadModule,
    DropdownModule
  ],
  declarations: [
    IndexComponent,
    OptComponent,
    MediaComponent,
    CommonInfoComponent,
    AttachmentComponent
  ],
  providers: [WorkingPortalService, LocalStorage]
})
export class WorkingPortalModule {


}
