import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const oauthConfig: AuthConfig = {
  issuer: "https://accounts.google.com",
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '141269017943-q54v55hkpedlm9k2g7e1ta2s9dnak6k3.apps.googleusercontent.com',
  scope: 'openid profile email'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  user: any;

  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(oauthConfig)
    oAuthService.loadDiscoveryDocument().then( () => {
      oAuthService.tryLoginImplicitFlow().then( () => {
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow()
        }
        else {
          oAuthService.loadUserProfile().then( (userProfile) => {
            console.log(JSON.stringify(userProfile))
            this.user = userProfile
          })
        }
      })
    })
  }

  getUser() {
    return this.user
  }
}
