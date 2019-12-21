import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {AuthProvider} from 'ngx-auth-firebaseui';

import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  providers = AuthProvider;

  authError: any = null;

  constructor(private router: Router, private userService: UserService, private db: AngularFirestore ) {


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

    this.authError = error;
    
    window.setTimeout(() => {

      this.authError = null;

    }, 4200);
  }
}
