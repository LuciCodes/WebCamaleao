import { Component, OnInit } from '@angular/core';
import { AppAuthenticationService } from 'src/app/services/appAuthentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private appAuth: AppAuthenticationService, private router: Router) { }

  ngOnInit() {

    this.appAuth.logout();

    this.router.navigateByUrl('/login');
  }
}
