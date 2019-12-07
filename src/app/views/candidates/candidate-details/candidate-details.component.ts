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
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {

  @Input()
  candidateDetails: CandidateDetails = new CandidateDetails();
  
  public frmCandidateBasicInfo: FormGroup;

  private flagLoadingData = false;
  private flagSavingData = false;

  get ptBrDateMask() { return AppConstants.ptBrDateMask; }
  get cpfMask() { return AppConstants.cpfMask; }
  get phoneMask() { return AppConstants.phoneMask; }

  get states(): Array<any> {

    return AppConstants.brazilianStates;
  }
  
  get isValid(): boolean {
    return this.frmCandidateBasicInfo && this.frmCandidateBasicInfo.valid;
  }

  get cities(): Array<any> {

    if (this.frmCandidateBasicInfo.controls.addrState.valid) {

      let theStateId = this.frmCandidateBasicInfo.controls.addrState.value

      let theState = AppConstants.brazilianStates.find(s => s.abrev == theStateId);

      if (theState) {

        return theState.cities;
      }
    }

    return [];
  }

  get hasState(): boolean {

    return (this.frmCandidateBasicInfo
          && this.frmCandidateBasicInfo.controls
          && this.frmCandidateBasicInfo.controls.addrState
          && this.frmCandidateBasicInfo.controls.addrState.valid);
  }

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private candidateService: CandidateService,
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

    if (!this.flagSavingData && this.frmCandidateBasicInfo.valid) {

      /*
      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let candidate: any = new Candidate(this.frmCandidateBasicInfo.value).toDocumentObject();

      console.log('Saving candidate:', candidate);

      let result = await this.userService.saveUserCandidate(candidate);

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');

      this.flagSavingData = false;
      */
    }
  }
}
