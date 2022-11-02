import { TestBed } from '@angular/core/testing';
import { OAuthService } from 'angular-oauth2-oidc';

import { GoogleApiService } from './google-api.service';

describe('GoogleApiService', () => {
  let service: GoogleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
      {provide: OAuthService, useValue: {
        configure: (conf: any) => console.log(""),
        loadDiscoveryDocument: () => {return {then: (func: any) => func()}},
        tryLoginImplicitFlow: () => {return {then: (func: any) => func()}},
        hasValidAccessToken: () => console.log(""),
        initLoginFlow: () => console.log(""),
        loadUserProfile: () => {return {then: (func: any) => func()}},
      }}
    ]});
    service = TestBed.inject(GoogleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getUser', () => {
    let email: string = "test@email.com"
    let testUser: Object = {info: {email: email}}
    service.user = testUser

    let ret = service.getUser()

    expect(ret).toEqual(testUser);
  });
});
