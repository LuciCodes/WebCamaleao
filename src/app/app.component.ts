import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {

    window.onresize = () => {

      let el = document.querySelector('.mat-sidenav-container');

      if (el) {

        el.setAttribute('style', `height: ${ document.body.clientHeight }px`);
      }
    }

    window.setTimeout(() => {

      window.onresize(null);
    }, 420);
  }
}
