import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {AuthProvider} from 'ngx-auth-firebaseui';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  providers = AuthProvider;


  constructor(private router: Router, private db: AngularFirestore ) {


  }

  async redirectUser(user: any) {

    //get the user profileInfo, 
    console.log('Redirecting user...', user);

    this.router.navigateByUrl('/');
  }
}
