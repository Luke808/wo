import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard, BASE_HREF, LayoutModule} from 'smsf-ui-layout';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {OAuthModule} from 'angular-oauth2-oidc';
import {AppRoutingModule} from './app-routing.module';
import {PanelMenuSub} from 'primeng/primeng';
import {Constants} from './shared';
import {ApiModule, BASE_PATH, Configuration} from './services/rest';
import {ApiModule as ApiModuleNC, BASE_PATH as BASE_PATH_NC, Configuration as ConfigurationNC} from './services/nc-rest';

export function ConfigurationFactory() {
  return new Configuration({apiKeys: {}});
}

export function NCConfigurationFactory() {
  return new ConfigurationNC({apiKeys: {}});
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.serverUri, environment.ncServerUri],
        sendAccessToken: true
      }
    }),
    ApiModule.forRoot(ConfigurationFactory),
    ApiModuleNC.forRoot(NCConfigurationFactory),
    AppRoutingModule,
    LayoutModule.forRoot({
      // Service请求自动注入tenantid和返回值自动解包
      serviceInterceptor: {
        basePath: [environment.serverUri, environment.ncServerUri],
        tenantId: environment.tenantId,
      },
      /**
       * 国际化（多语言）配置
       */
      i18nConfig: {
        rootNode: 'xchange',
        diableLangs: ['jp']
      },
      // 配置菜单服务
      menuServiceConfig: {
        // 本服务名称（与后台menu_en.json配置一致）
        replaceLabel: 'Xchange'
      }
    })
  ],
  entryComponents: [
    PanelMenuSub
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide: BASE_HREF, useValue: environment.baseHref},
    {provide: BASE_PATH, useValue: environment.serverUri},
    {provide: BASE_PATH_NC, useValue: environment.ncServerUri},
    Constants,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
