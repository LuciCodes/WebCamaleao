import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/models/candidate';
import { CandidateProfile } from 'src/app/models/candidateProfile';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate.service';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/etc/appConstants';
import { CandidateDetails } from 'src/app/models/candidateDetails';
import { MatSnackBar } from '@angular/material';

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

    if (!this.candidateService.editingCandidate) {

      this.candidateService.editingCandidate = new CandidateDetails();
    }

    this.candidateService.editingCandidate.candidate = this._candidate;
    this.candidateService.editingCandidate.candidateProfile = this._candidateProfile;
  }
  
  @Input()
  get candidateProfile(): CandidateProfile {

    return this._candidateProfile;
  }

  set candidateProfile(value: CandidateProfile) {

    this._candidateProfile = value;
    this.initFormCandidateProfile(this._candidateProfile);
    
    if (!this.candidateService.editingCandidate) {

      this.candidateService.editingCandidate = new CandidateDetails();
    }

    this.candidateService.editingCandidate.candidate = this._candidate;
    this.candidateService.editingCandidate.candidateProfile = this._candidateProfile;
  }

  flagLoadingData = false;
  flagSavingData = false;

  public frmCandidate: FormGroup;
  public frmCandidateProfile: FormGroup;

  get isCandidateValid(): boolean {

    return this.frmCandidate && this.frmCandidate.valid;
  }

  get isProfileValid(): boolean {

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

  constructor(private fb: FormBuilder,
              private candidateService: CandidateService,
              private snackBar: MatSnackBar) {  }

  initFormCandidate(obj?: any) {
    
    if (!obj) { obj = {}; }

    this.frmCandidate = this.fb.group({
      id: [obj.id],
      name: [obj.name, Validators.required],
      birth: [obj.birth],
      cpf: [obj.cpf],
      docRg: [obj.docRg],
      phone: [obj.phone],
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
      id: [obj.id],
      gender: [obj.gender],
      sex: [obj.sex],
      ethnicity: [obj.ethnicity],
      pne: [(obj.pne == true)],
      pneNote: [obj.pneNote]
    });
  }
  
  async ngOnInit() {

  }

  async saveBasicInfo() {

    if (!this.flagSavingData && this.frmCandidate.valid && this.frmCandidateProfile.valid) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let candidate: any = new Candidate(this.frmCandidate.value).toDocumentObject();
      let profile: any = new CandidateProfile(this.frmCandidateProfile.value).toDocumentObject();

      console.log('Saving candidate/profile:', { candidate, profile });

      let result = { msg: 'Dados salvados com sucesso!', candidate: null, profile: null };

      result.candidate = await this.candidateService.saveCandidateBasicInfo(candidate);
      result.profile = await this.candidateService.saveCandidateProfile(profile);

      console.log('Saved:', result);

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');

      this.flagSavingData = false;
    }
  }

  updateCandidateValue(propertyName: string, evtObj) {

    if (this.frmCandidate.valid
     && this.candidateService.editingCandidate) {

      this.candidateService.editingCandidate.candidate[propertyName] = evtObj.srcElement.value;
    }
  }
  

  updateProfileValue(propertyName: string, evtObj) {

    if (this.frmCandidate.valid
     && this.candidateService.editingCandidate) {

      debugger;
      this.candidateService.editingCandidate.candidate[propertyName] = evtObj.value;
    }
  }
}
