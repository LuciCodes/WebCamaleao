import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/etc/appConstants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-companies-basic-info',
  templateUrl: './companies-basic-info.component.html',
  styleUrls: ['./companies-basic-info.component.css']
})
export class CompaniesBasicInfoComponent implements OnInit {

  public frmCompaniesBasicInfo: FormGroup;

  private flagLoadingData = false;
  private flagSavingData = false;

  get ptBrDateMask() { return AppConstants.ptBrDateMask; }
  get cpfMask() { return AppConstants.cpfMask; }
  get phoneMask() { return AppConstants.phoneMask; }

  get states(): Array<any> {

    return AppConstants.brazilianStates;
  }
  
  get isValid(): boolean {
    return this.frmCompaniesBasicInfo && this.frmCompaniesBasicInfo.valid;
  }

  get cities(): Array<any> {

    if (this.frmCompaniesBasicInfo.controls.addrState.valid) {

      let theStateId = this.frmCompaniesBasicInfo.controls.addrState.value

      let theState = AppConstants.brazilianStates.find(s => s.abrev == theStateId);

      if (theState) {

        return theState.cities;
      }
    }

    return [];
  }

  get hasState(): boolean {

    return (this.frmCompaniesBasicInfo
          && this.frmCompaniesBasicInfo.controls
          && this.frmCompaniesBasicInfo.controls.addrState
          && this.frmCompaniesBasicInfo.controls.addrState.valid);
  }

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private snackBar: MatSnackBar) {

    this.initForm({});
  }

  initForm(obj?: any)
  {
    if (!obj) { obj = {}; }

    this.frmCompaniesBasicInfo = this.fb.group({
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

    /*
    if (this.userService.user)
    {
      if (!this.userService.companies)
      {
  
        await this.userService.loadUserCompanies();
      }
  
      this.initForm(this.userService.companies);
    }
    */
    
    this.flagLoadingData = false;
  }

  async save() {

    if (!this.flagSavingData && this.frmCompaniesBasicInfo.valid) {

      this.flagSavingData = true;

      /*
      let msg = this.snackBar.open('Salvando dados...');

      let companies: any = new Companies(this.frmCompaniesBasicInfo.value).toDocumentObject();

      console.log('Saving companies:', companies);

      let result = await this.userService.saveUserCompanies(companies);

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');
      */

      this.flagSavingData = false;
    }
  }
}
