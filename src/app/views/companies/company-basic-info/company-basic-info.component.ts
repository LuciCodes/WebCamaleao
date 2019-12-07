import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/etc/appConstants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-basic-info',
  templateUrl: './company-basic-info.component.html',
  styleUrls: ['./company-basic-info.component.css']
})
export class CompanyBasicInfoComponent implements OnInit {

  public frmCompanyBasicInfo: FormGroup;

  private flagLoadingData = false;
  private flagSavingData = false;

  get ptBrDateMask() { return AppConstants.ptBrDateMask; }
  get cpfMask() { return AppConstants.cpfMask; }
  get phoneMask() { return AppConstants.phoneMask; }

  get states(): Array<any> {

    return AppConstants.brazilianStates;
  }
  
  get isValid(): boolean {
    return this.frmCompanyBasicInfo && this.frmCompanyBasicInfo.valid;
  }

  get cities(): Array<any> {

    if (this.frmCompanyBasicInfo.controls.addrState.valid) {

      let theStateId = this.frmCompanyBasicInfo.controls.addrState.value

      let theState = AppConstants.brazilianStates.find(s => s.abrev == theStateId);

      if (theState) {

        return theState.cities;
      }
    }

    return [];
  }

  get hasState(): boolean {

    return (this.frmCompanyBasicInfo
          && this.frmCompanyBasicInfo.controls
          && this.frmCompanyBasicInfo.controls.addrState
          && this.frmCompanyBasicInfo.controls.addrState.valid);
  }

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private snackBar: MatSnackBar) {

    this.initForm({});
  }

  initForm(obj?: any)
  {
    if (!obj) { obj = {}; }

    this.frmCompanyBasicInfo = this.fb.group({
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
      if (!this.userService.company)
      {
  
        await this.userService.loadUserCompany();
      }
  
      this.initForm(this.userService.company);
    }
    */
    
    this.flagLoadingData = false;
  }

  async save() {

    if (!this.flagSavingData && this.frmCompanyBasicInfo.valid) {

      this.flagSavingData = true;

      /*
      let msg = this.snackBar.open('Salvando dados...');

      let company: any = new Company(this.frmCompanyBasicInfo.value).toDocumentObject();

      console.log('Saving company:', company);

      let result = await this.userService.saveUserCompany(company);

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');
      */

      this.flagSavingData = false;
    }
  }
}
