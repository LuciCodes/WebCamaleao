import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/etc/appConstants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
//import { Match } from 'src/app/models/match';
//import { MatchProfile } from 'src/app/models/matchProfile';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css']
})
export class CompanyHomeComponent implements OnInit {

  public frmMatchProfile: FormGroup;

  private flagLoadingData = false;
  private flagSavingData = false;

  get isValid(): boolean {

    return this.frmMatchProfile && this.frmMatchProfile.valid;
  }

  get flagIsPcd(): boolean {
    
    return (this.frmMatchProfile &&
            this.frmMatchProfile.controls.pcd &&
            this.frmMatchProfile.controls.pcd.value == 'true');
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

    this.frmMatchProfile = this.fb.group({
      gender: [obj.gender],
      sex: [obj.sex],
      ethnicity: [obj.ethnicity],
      pne: [obj.pne],
      pneNote: [obj.pneNote],
    });
  }

  async ngOnInit() {

    this.flagLoadingData = true;

    /*
    if (!this.userService.matchProfile) {

      await this.userService.loadUserMatchProfile();
    }

    this.initForm(this.userService.matchProfile);
    */

    this.flagLoadingData = false;
  }

  async save() {

    if (!this.flagSavingData && this.frmMatchProfile.valid) {

      this.flagSavingData = true;

      /*
      let msg = this.snackBar.open('Salvando dados...');

      let matchProf: any = new MatchProfile(this.frmMatchProfile.value).toDocumentObject();

      console.log('Saving match profile:', matchProf);

      let result = await this.userService.saveUserMatchProfile(matchProf);

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');
      */

      this.flagSavingData = false;
    }
  }
}
