import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/models/candidate';
import { CandidateProfile } from 'src/app/models/candidateProfile';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate.service';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/etc/appConstants';

@Component({
  selector: 'app-candidate-panel-basic-info-edit',
  templateUrl: './candidate-panel-basic-info-edit.component.html',
  styleUrls: ['./candidate-panel-basic-info-edit.component.css']
})
export class CandidatePanelBasicInfoEditComponent implements OnInit {

  
  private _candidate: Candidate;
  private _candidateProfile: CandidateProfile;

  @Input()
  get candidate(): Candidate {

    return this._candidate;
  }

  set candidate(value: Candidate) {

    this._candidate = value;
    this.initFormCandidate(this._candidate);
  }
  
  @Input()
  get candidateProfile(): CandidateProfile {

    return this._candidateProfile;
  }

  set candidateProfile(value: CandidateProfile) {

    this._candidateProfile = value;
    this.initFormCandidateProfile(this._candidateProfile);
  }

  flagLoadingData = false;
  flagSavingData = false;

  public frmCandidate: FormGroup;
  public frmCandidateProfile: FormGroup;
  
  get isValid(): boolean {

    return this.frmCandidateProfile && this.frmCandidateProfile.valid;
  }

  get flagIsPcd(): boolean {
    
    return (this.frmCandidateProfile &&
            this.frmCandidateProfile.controls.pcd &&
            this.frmCandidateProfile.controls.pcd.value == 'true');
  }

  get etnicities(): Array<any> {

    return AppConstants.ethnicities;
  }

  get genders(): Array<any> {

    return AppConstants.genders;
  }

  get sexes(): Array<any> {

    return AppConstants.sexes;
  }
  
  get states(): Array<any> {

    return AppConstants.brazilianStates;
  }
  
  get cities(): Array<any> {

    if (this.frmCandidate && this.frmCandidate.controls.addrState.valid) {

      let theStateId = this.frmCandidate.controls.addrState.value

      let theState = AppConstants.brazilianStates.find(s => s.abrev == theStateId);

      if (theState) {

        return theState.cities;
      }
    }

    return [];
  }

  constructor(private fb: FormBuilder) {  }

  initFormCandidate(obj?: any) {
    
    if (!obj) { obj = {}; }

    this.frmCandidate = this.fb.group({
      name: [obj.name],
      birth: [obj.birth],
      cpf: [obj.cpf],
      docRg: [obj.docRg],
      phone: [obj.phone],
      signupState: ['COMPLETED'],
      addrCity: [obj.addrCity],
      addrState: [obj.addrState],
      addrDistrict: [obj.addrDistrict],
      addrPostalCode: [obj.addrPostalCode],
      isSocialName: [obj.isSocialName]
    });
  }

  initFormCandidateProfile(obj?: any) {

    if (!obj) { obj = {}; }

    this.frmCandidateProfile = this.fb.group({
      gender: [obj.gender],
      sex: [obj.sex],
      ethnicity: [obj.ethnicity],
      pne: [(obj.pne == true)],
      pneNote: [obj.pneNote]
    });
  }
  
  async ngOnInit() {

  }

  async save() {

    if (!this.flagSavingData && this.frmCandidate.valid) {

      /*
      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let candidate: any = new Candidate(this.frmCandidate.value).toDocumentObject();

      console.log('Saving candidate:', candidate);

      let result = await this.userService.saveUserCandidate(candidate);

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');

      this.flagSavingData = false;
      */
    }
  }
}
