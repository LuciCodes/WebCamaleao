import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { AppConstants } from 'src/app/etc/appConstants';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase';
import { ImageService } from 'src/app/services/image.service';
import { AppUser } from 'src/app/models/appUser';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  public flagSavingData = false;
  public flagLoadingData = false;

  frmUser: any;

  editingObj: AppUser;

  public flagNewUser: boolean;

  get isValid(): boolean {

    return this.frmUser && this.frmUser.valid;
  }

  private _companies: Array<Company>;

  get companies() {

    if (!this._companies) {

      this._companies = this.companyService.companies.sort();
    }

    return this._companies;
  }

  get roleList(): Array<any> {

    return AppConstants.userRoles.list;
  }

  constructor(private fb: FormBuilder,
              public location: Location,
              private companyService: CompanyService,
              private imgService: ImageService,
              private userService: UserService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {

    this.initForm();
  }

  initForm(obj?: any) {
    
    if (!obj) { obj = {}; }

    this.frmUser = this.fb.group({
      displayName: [obj.displayName, Validators.required],
      phoneNumber: [obj.phoneNumber],
      email: [{value: obj.email, disabled: true}],
      photoUrl: [obj.photoUrl],
      state: [obj.state],
      roleName: [obj.roleName],
      companyId: [obj.companyId]
    });
  }

  async ngOnInit() {

    this.flagLoadingData = true;

    await this.companyService.loadCompanies(true);

    this.route.paramMap.subscribe(async(params) => {

      let id = params.get('id');

      if (!id || id == '' || id == 'incluir') {

        this.flagNewUser = true;

        this.editingObj = new AppUser();

      } else {

        this.editingObj = await this.userService.getUser(id);
      }

      //this.displayLogo = this.imgService.logoOf(this.editingObj);

      this.initForm(this.editingObj);

      this.flagLoadingData = false;
      
    });
  }

  updateDisplayLogo() {

    //this.displayLogo = this.imgService.logoOf(this.frmUser.value);
  }

  useDefaultLogo() {

    this.frmUser.controls.logoUrl.setValue(null);

    this.updateDisplayLogo();
  }

  async save() {

    if (!this.flagSavingData && this.frmUser.valid) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let user: AppUser = new AppUser(this.frmUser.value);

      let snackMsg = '';

      if (this.flagNewUser) {

        user.uid = 'new';

        //user.created = firebase.firestore.Timestamp.fromDate(new Date());

      } else{

        user.uid = this.editingObj.uid;
        user.email = this.editingObj.email; // read-only

        user.updatedUserId = this.userService.user.uid;
        user.updated = firebase.firestore.Timestamp.fromDate(new Date());
      }

      console.log('Saving user:', user);

      let result = await this.userService.saveUser(user);

      if (result.success) {

        snackMsg = 'Dados do usuário salvados com sucesso.'

        if (user.roleName != this.editingObj.roleName) {
        
          // gotta setClaims on the user to affect it
          let claimResult = await this.userService.saveUserRoleNameClaim(user.uid, user.roleName);

          if (!claimResult.success) {
          
            snackMsg += ' Erro setClaim: ' + claimResult.msg;
          }
        }

        this.editingObj = result.resultObj;

      } else {
      
        snackMsg = result.msg;
      }

      this.flagNewUser = false;

      msg.dismiss();

      msg = this.snackBar.open(snackMsg, 'OK');

      this.flagSavingData = false;
    }
  }

}
