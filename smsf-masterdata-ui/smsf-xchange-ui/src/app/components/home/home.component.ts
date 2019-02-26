import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthorized = false;
  claims: any;

  constructor(private oauthService: OAuthService) { }

  ngOnInit() {
    this.isAuthorized = this.oauthService.hasValidIdToken();
    this.claims = this.oauthService.getIdentityClaims();
  }
}
