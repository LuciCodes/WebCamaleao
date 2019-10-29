import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppUser } from 'src/app/models/AppUser';
import { AppAuthenticationService } from 'src/app/services/appAuthentication.service';

@Component({
  selector: 'app-app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.css']
})
export class AppIndexComponent {

  get user(): AppUser {

    return this.appAuth.user;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private appAuth: AppAuthenticationService,
              private breakpointObserver: BreakpointObserver) {}

}
