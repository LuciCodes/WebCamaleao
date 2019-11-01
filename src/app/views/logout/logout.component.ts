import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(public afa: AngularFireAuth, private router: Router) { }

  async ngOnInit() {

    await this.signOut();

    this.router.navigateByUrl('/login');
  }

  async signOut() {

    try {

      await this.afa.auth.signOut();

    } catch (e) {

      console.error('An error happened while signing out!', e);
    }
  }
}
