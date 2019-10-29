
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AppAuthenticationService } from '../services/appAuthentication.service';

@Injectable()
export class LoggedUserRouteActivator implements CanActivate {

  constructor(private router: Router, private appAuth: AppAuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.appAuth.initialize();

    const hasUser = (this.appAuth.user && this.appAuth.user.logged);
 
    if (!hasUser) {

      this.router.navigate(['/login']);

      return false;
    }

    return true;
  }
}
