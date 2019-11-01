import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-camaleao-tags',
  templateUrl: './camaleao-tags.component.html',
  styleUrls: ['./camaleao-tags.component.css']
})
export class CamaleaoTagsComponent implements OnInit {

  _tagCollection: Array<any> = [];

  get tags(): Array<any> {

    return this._tagCollection;
  }
  
  @Input()
  set tags(val: Array<any>) {

    //if we pass more than 1 array then concat them (like skills nad tags)

    if (Array.isArray(val[0])) {

      this._tagCollection = val[0];

      for(let a = 1; a < val.length; a++) {

        if (Array.isArray(val[a])) {

          this._tagCollection = this._tagCollection.concat(val[a]);

        } else {

          this._tagCollection.push(val[a]);
         }
      }
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
