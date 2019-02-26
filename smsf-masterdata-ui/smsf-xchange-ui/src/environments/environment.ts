// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authConfig: {
    issuer: 'https://dlhpvva0002.dir.svc.accenture.com/smsf.identity',
    redirectUri: window.location.origin,
    silentRefreshRedirectUri: window.location.origin + '/assets/silent-refresh.html',
    clientId: 'angular',
    scope: 'openid profile user_profile',
    requireHttps: false,
    oidc: true
  },
  serverUri: 'http://localhost:10048',
  ncServerUri: 'http://10.237.161.208:10021/noncompliance/',
  baseHref: '',
  applicationId: 'xchange',
  tenantId: 'b'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
