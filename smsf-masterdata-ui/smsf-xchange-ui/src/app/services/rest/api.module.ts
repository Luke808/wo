import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AttachmentService } from './api/attachment.service';
import { BusinessCaseService } from './api/businessCase.service';
import { BusinessObjectService } from './api/businessObject.service';
import { ComponentControllerService } from './api/componentController.service';
import { DirectiveControllerService } from './api/directiveController.service';
import { ProcessControllerService } from './api/processController.service';
import { TemplateControllerService } from './api/templateController.service';
import { TestControllerService } from './api/testController.service';
import { ValidationRuleControllerService } from './api/validationRuleController.service';
import { WorkingPortalAdviceControllerService } from './api/workingPortalAdviceController.service';
import { WorkingPortalControllerService } from './api/workingPortalController.service';
import { XchangeControllerService } from './api/xchangeController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AttachmentService,
    BusinessCaseService,
    BusinessObjectService,
    ComponentControllerService,
    DirectiveControllerService,
    ProcessControllerService,
    TemplateControllerService,
    TestControllerService,
    ValidationRuleControllerService,
    WorkingPortalAdviceControllerService,
    WorkingPortalControllerService,
    XchangeControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
