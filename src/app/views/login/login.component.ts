import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {AuthProvider} from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  providers = AuthProvider;

  constructor(private router: Router) {

  }

  redirectUser(user: any) {

    console.log('Redirecting user...', user);

    this.router.navigateByUrl('/');
  }
}
