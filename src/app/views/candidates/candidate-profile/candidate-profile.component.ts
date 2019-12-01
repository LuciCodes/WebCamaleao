import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/etc/appConstants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { Candidate } from 'src/app/models/candidate';
import { CandidateProfile } from 'src/app/models/candidateProfile';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

  public frmCandidateProfile: FormGroup;

  private flagLoadingData = false;
  private flagSavingData = false;

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

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {

    this.initForm();
  }

  initForm(obj: any = {}) {

    this.frmCandidateProfile = this.fb.group({
      gender: [obj.gender],
      sex: [obj.sex],
      ethnicity: [obj.ethnicity],
      pne: [obj.pne],
      pneNote: [obj.pneNote],
    });
  }

  async ngOnInit() {

    this.flagLoadingData = true;

    if (!this.userService.candidateProfile) {

      await this.userService.loadUserCandidateProfile();
    }

    this.initForm(this.userService.candidateProfile);
    
    this.flagLoadingData = false;
  }

  async save() {

    if (!this.flagSavingData && this.frmCandidateProfile.valid) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let candidateProf: any = new CandidateProfile(this.frmCandidateProfile.value).toDocumentObject();

      console.log('Saving candidate profile:', candidateProf);

      let result = await this.userService.saveUserCandidateProfile(candidateProf);

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');

      this.flagSavingData = false;
    }
  }
}
