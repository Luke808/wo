import {Component, OnInit} from '@angular/core';
import {CommonService} from 'smsf-ui-layout';
import {environment} from '../../../../environments/environment';
import * as FileSaver from 'file-saver';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  progressValue = 0;


  constructor(public cs: CommonService, private oauthService: OAuthService) {
  }

  ngOnInit() {
  }

  handleClick(event) {
    const url = `${environment.serverUri}/generator`;
    const xhr = new XMLHttpRequest();
    const token = 'Bearer ' + this.oauthService.getAccessToken();
    const tenantId = environment.tenantId;
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', token);
    xhr.setRequestHeader('tenantId', tenantId);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        FileSaver.saveAs(xhr.response, 'project.zip');
      }
    };
    xhr.send();
  }
}
