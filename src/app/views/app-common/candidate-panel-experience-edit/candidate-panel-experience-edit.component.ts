import { Component, OnInit, Input } from '@angular/core';
import { WorkExperience } from 'src/app/models/workExperience';

import * as moment from 'moment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-candidate-panel-experience-edit',
  templateUrl: './candidate-panel-experience-edit.component.html',
  styleUrls: ['./candidate-panel-experience-edit.component.css']
})
export class CandidatePanelExperienceEditComponent {

  @Input()
  candidateExperience: Array<WorkExperience>;
  
  @Input()
  showTitle: boolean = true;

  @Input()
  mode: string = 'default';

  frmCandidateExperience: FormGroup;
  
  constructor(private fb: FormBuilder) { 

    this.initForm();
  }

  initForm() {

    this.frmCandidateExperience = this.fb.group({

      companyName: ['', Validators.required],
      roleName: ['', Validators.required],
      description: [''],
      startDate: [''],
      endDate: [''],
      isCurrent: [false]
    });
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

  removeExperience(experience: any) {

  }
}