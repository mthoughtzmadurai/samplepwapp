import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

declare let ga: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'pwapp';

  constructor(private router: Router, private oauthService: OAuthService) {
    const currentRoute = this.router.url;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });

    this.oauthService.redirectUri = window.location.origin;
    this.oauthService.clientId = '0oacrosqllIPmCxXP0h7';
    this.oauthService.scope = 'openid profile email';
    this.oauthService.issuer = 'https://perkinswill.oktapreview.com';
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();

    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.tryLogin({
        onTokenReceived: (info) => {
          this.router.navigate([info.state]);
        }
      });
    });
  }
}
