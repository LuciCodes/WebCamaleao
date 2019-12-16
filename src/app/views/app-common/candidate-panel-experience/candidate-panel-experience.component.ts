import { Component, OnInit, Input } from '@angular/core';
import { Experience } from 'src/app/models/experience';

import * as moment from 'moment';

@Component({
  selector: 'app-candidate-panel-experience',
  templateUrl: './candidate-panel-experience.component.html',
  styleUrls: ['./candidate-panel-experience.component.css']
})
export class CandidatePanelExperienceComponent implements OnInit {

  @Input()
  candidateExperience: Array<Experience>;
  
  @Input()
  showTitle: boolean = true;

  @Input()
  mode: string = 'default';

  constructor() { }

  ngOnInit() {
  }

  dateDiffString(date1, date2) {

    date1 = moment(date1);
    date2 = moment(date2);

    let mo = Math.abs(moment(date1).diff(date2, 'days'));

    let result = mo + ' dias';

    if (mo > 91 && mo < 361) {

      mo = Math.abs(moment(date1).diff(date2, 'months'));
      result = mo + ' ' + (mo == 1 ? 'mês' : 'meses');

    } else if (mo > 361) {

      mo = Math.abs(moment(date1).diff(date2, 'years'));
      result = mo + ' ano' + (mo == 1 ? '' : 's');
    }

    return result;
  }
}