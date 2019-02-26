import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {CommonService} from 'smsf-ui-layout';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smsf-xchange-ui';

  constructor(private oauthService: OAuthService,
              private translate: TranslateService,
              private commonService: CommonService
  ) {
    // Initial OAuthService
    this.initOAuth();

    // Initial translate
    // this.initTranslate();
    this.commonService.initi18n('zh');
  }

  private initOAuth() {
    this.oauthService.configure(environment.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  private initTranslate() {
    // console.log(translate.getBrowserLang());
    // translate.addLangs(['zh', 'en']);
    this.translate.setDefaultLang('zh');
    this.translate.use('zh');
    this.commonService.loadi18n();
    // console.log(this.commonService);
  }
}
