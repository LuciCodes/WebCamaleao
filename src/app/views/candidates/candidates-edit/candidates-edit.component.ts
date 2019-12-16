import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';

import { Candidate } from 'src/app/models/candidate';
import { CandidateDetails } from 'src/app/models/candidateDetails';
import { CandidateService } from 'src/app/services/candidate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidates-edit',
  templateUrl: './candidates-edit.component.html',
  styleUrls: ['./candidates-edit.component.css']
})
export class CandidatesEditComponent implements OnInit {

  @Input()
  candidateDetails: CandidateDetails = new CandidateDetails();
  
  public frmCandidate: FormGroup;
  public frmCandidateProfile: FormGroup;
  public frmCandidateHabilities: FormGroup;
  public frmcandidateExperiences: FormGroup;

  private flagLoadingData = false;
  private flagSavingData = false;

  get ptBrDateMask() { return AppConstants.ptBrDateMask; }
  get cpfMask() { return AppConstants.cpfMask; }
  get phoneMask() { return AppConstants.phoneMask; }

  get states(): Array<any> {

    return AppConstants.brazilianStates;
  }

  constructor(private candidateService: CandidateService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {  }
  
  async ngOnInit() {

    this.flagLoadingData = true;

    this.route.paramMap.subscribe(async(params) => {

      let id = params.get('id');

      console.log(`getCandidateDetails(${ id })`);

      this.candidateDetails = await this.candidateService.getCandidateDetails(id);

      this.flagLoadingData = false;
      
    });
  }

  async save() {

    if (!this.flagSavingData && this.frmCandidate.valid) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      console.log('Saving candidate:', this.candidateDetails);

      let result = await this.candidateService.saveCandidate(this.candidateDetails);

      console.log('Saving result:', result.obj);

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');

      this.flagSavingData = false;
    }
  }
}
