import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export class UserService {

  user: User;
  user$: Observable<User | null>;

  get hasUser(): boolean {

    return this.user != null;
  }

  get userIsCandidate(): boolean {

    return (this.hasUser && this.user['type'] == 'CANDIDATE');
  }

  constructor(private fireAuth: AngularFireAuth,) {

    this.user$ = this.fireAuth.user;

    this.user$.subscribe((user: User) => {

      this.user = user;

    });
  }
}