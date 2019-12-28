import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {AuthProvider} from 'ngx-auth-firebaseui';

import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  providers = AuthProvider;

  authError: any = null;

  constructor(private router: Router,
              private userService: UserService,
              private afa: AngularFireAuth) {

  }

  redirectUser(user: any) {

    //get the user profileInfo, 
    console.log('Redirecting user...', user);

    this.userService.user = user;

    this.router.navigateByUrl('/');
  }
  
  async handleError(error: any) {

    //get the user profileInfo, 
    console.log('Auth error:', error);

    this.userService.user = null;

    this.afa.auth.signOut();

    this.authError = error;
  }
}
