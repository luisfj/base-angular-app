import {NB_AUTH_OPTIONS, NbAuthService, NbLogoutComponent, NbTokenService} from '@nebular/auth';
import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-logout',
  template: '<h2>Saindo...</h2>',
})
export class LogoutComponent extends NbLogoutComponent implements OnInit {
  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router,
    protected tokenService: NbTokenService  ) {
    super(service, options, router);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  logout(strategy: string): void {
    super.logout(strategy);
    this.tokenService.clear();
  }
}
