import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {

    /*
    window.onresize = () => {

      let el = document.querySelector('.mat-sidenav-container');

      if (el) {

        let h = document.body.clientHeight;

        console.log('Setheight: ' + h);

        //el.setAttribute('style', `height: ${ h }px`);
      }
    }

    window.setTimeout(() => {

      window.onresize(null);
    }, 420);
    */
  }
}
