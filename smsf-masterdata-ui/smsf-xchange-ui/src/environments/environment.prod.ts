export const environment = {
  production: true,
  authConfig: {
    issuer: 'https://dlhpvva0002.dir.svc.accenture.com/smsf.identity',
    redirectUri: window.location.origin + '/smsf.authority.ui',
    silentRefreshRedirectUri: window.location.origin + '/smsf.authority.ui/assets/silent-refresh.html',
    clientId: 'angular',
    scope: 'openid profile user_profile',
    requireHttps: false,
    oidc: true
  },
  baseHref: '/smsf.xchange.ui',
  serverUri: 'https://dlhpvva0002.dir.svc.accenture.com/smsf/xchange',
  ncServerUri: 'https://dlhpvva0002.dir.svc.accenture.com/smsf/noncompliance',
  applicationId: 'xchange',
  tenantId: 'b'
};
