
import { Injectable, Output, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { AppUser } from '../models/AppUser';


@Injectable()
export class AppAuthenticationService {

  user: AppUser;

  initialized = false;

  lastSaved: number = 0;

  @Output()
  onSessionExpired: EventEmitter<any> = new EventEmitter();

  @Output()
  onRedirectNeeded: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient ) {
  }

  initialize() {

    if (!this.initialized) {

      let theUser: any;

      theUser = window.localStorage.getItem('camaleaoPerson');

      this.user = new AppUser();

      if (theUser) {

        try {

          theUser = JSON.parse(theUser);

          Object.assign(this.user, theUser);

          this.user.logged = true;

          localStorage.setItem('bearerToken', this.user.token);

        } catch(e) {}
      }

      this.initialized = true;
    }
  }

  saveUser() {

    localStorage.setItem('camaleaoPerson', JSON.stringify(this.user));
  }

  logout(): void {

    this.user = new AppUser();

    localStorage.clear();
  }

  sessionExpired(): void {

    this.logout();

    localStorage.setItem('camaleaoRedirectAfterLogin', document.location.pathname);

    //console.log('Redirect After Login: ' + document.location.pathname);

    this.onSessionExpired.emit();
  }

  logUser(theUserObj?: any): Promise<AppUser> {

    return new Promise((resolve, reject) => {

      try {
  
        this.user = new AppUser(theUserObj);

        localStorage.setItem('camaleaoPerson', JSON.stringify(this.user));

        resolve(this.user);
        
      } catch(err) {

        reject(err);
      }
    })
  }

  registerUser(theUserObj?: any): Promise<AppUser> {

    return new Promise((resolve, reject) => {

      try {
  
        this.user = new AppUser(theUserObj);

        localStorage.setItem('camaleaoPerson', JSON.stringify(this.user));

        resolve(this.user);
        
      } catch(err) {

        reject(err);
      }
    })
  }
}
