import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/etc/appConstants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Candidate } from 'src/app/models/candidate';
import { UserService } from 'src/app/services/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-candidate-basic-info',
  templateUrl: './candidate-basic-info.component.html',
  styleUrls: ['./candidate-basic-info.component.css']
})
export class CandidateBasicInfoComponent implements OnInit {

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
              private snackBar: MatSnackBar) {

    this.initForm({});
  }

  initForm(obj?: any)
  {
    if (!obj) { obj = {}; }

    this.frmCandidateBasicInfo = this.fb.group({
      name: [obj.name, Validators.required],
      birth: [obj.birth, Validators.required],
      docRg: [obj.docRg, Validators.required],
      signupState: ['COMPLETED'],
      addrCity: [obj.addrCity, Validators.required],
      addrState: [obj.addrState, Validators.required],
      addrDistrict: [obj.addrDistrict, Validators.required],
      isSocialName: [obj.isSocialName]
    });
  }

  async ngOnInit() {

    this.flagLoadingData = true;

    if (this.userService.user)
    {
      if (!this.userService.candidate)
      {
  
        await this.userService.loadUserCandidate();
      }
  
      this.initForm(this.userService.candidate);
    }
    
    this.flagLoadingData = false;
  }

  async save() {

    if (!this.flagSavingData && this.frmCandidateBasicInfo.valid) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let candidate: any = new Candidate(this.frmCandidateBasicInfo.value);

      console.log('Saving candidate:', candidate);

      let result = await this.userService.saveUserCandidate(candidate);

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');

      this.flagSavingData = false;
    }
  }
}
