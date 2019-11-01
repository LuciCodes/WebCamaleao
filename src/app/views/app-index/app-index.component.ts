import { Component, EventEmitter, Output, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import {User} from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material';
import { LinkMenuItem } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.css']
})
export class AppIndexComponent {
  @Input()
  canLogout = true;

  @Input()
  links: LinkMenuItem[];

  user: User;
  user$: Observable<User | null>;

  displayNameInitials: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(public afa: AngularFireAuth,
              public dialog: MatDialog,
              private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {

    this.user$ = this.afa.user;

    this.user$.subscribe((user: User) => {

      this.user = user;

      this.displayNameInitials = user ? this.getDisplayNameInitials(user.displayName) : null;

    });
  }

  getDisplayNameInitials(displayName: string): string {

    if (!displayName) {
      return null;
    }

    const initialsRegExp: RegExpMatchArray = displayName.match(/\b\w/g) || [];

    const initials = ((initialsRegExp.shift() || '') + (initialsRegExp.pop() || '')).toUpperCase();

    return initials;
  }

  openProfile() {

    //this.dialog.open(UserComponent);
  }
}
