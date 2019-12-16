import { Component, OnInit, Input } from '@angular/core';
import { Experience } from 'src/app/models/experience';

import * as moment from 'moment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate.service';
import { MatSnackBar } from '@angular/material';
import { CandidateDetails } from 'src/app/models/candidateDetails';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-candidate-panel-experience-edit',
  templateUrl: './candidate-panel-experience-edit.component.html',
  styleUrls: ['./candidate-panel-experience-edit.component.css']
})
export class CandidatePanelExperienceEditComponent {

  flagSavingData = false;

  @Input()
  set candidateExperience(value: Array<Experience>) {

    if (!this.candidateService.editingCandidate) {

      this.candidateService.editingCandidate = new CandidateDetails();
    }

    this.candidateService.editingCandidate.candidateExperience = value;
  }
  
  get candidateExperience(): Array<Experience> {

    return this.candidateService.editingCandidate.candidateExperience;
  }

  get isValid() {

    return (this.frmCandidateExperience && this.frmCandidateExperience.valid);
  }

  frmCandidateExperience: FormGroup;
  
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private candidateService: CandidateService,
              private snackBar: MatSnackBar) { 

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

  async addExperience() {

    if (this.frmCandidateExperience.valid && !this.flagSavingData) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let newExperience = new Experience(this.frmCandidateExperience.value);

      newExperience.candidateId = this.candidateService.editingCandidate.candidate.id;
      newExperience.updatedUserId = this.userService.user.uid;

      let result = await this.candidateService.saveCandidateExperience(newExperience);

      if (result.success) {

        newExperience.id = result.obj.id;

        this.candidateExperience.push(newExperience);
      }

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');
     
      this.flagSavingData = false;
    }
  }

  async removeExperience(exp: Experience) {

    if (!this.flagSavingData) {

      this.flagSavingData = true;

      let idx = this.candidateExperience.findIndex(c => c.id == exp.id);

      if (idx > -1) {
   
        let msg = this.snackBar.open('Salvando dados...');

        await this.candidateService.removeCandidateExperience(this.candidateExperience[idx]);

        this.candidateExperience.splice(idx, 1);
          
        msg.dismiss();

        msg = this.snackBar.open('Item excluído com sucesso.', 'OK');
      }
     
      this.flagSavingData = false;
    }
  }
}