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

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  public flagSavingData = false;
  public flagLoadingData = false;

  flagNewCompany = false;

  companyDescription: string;

  frmCompany: any;

  editingObj: Company;

  displayLogo: string = '';

  get isValid(): boolean {

    return this.frmCompany && this.frmCompany.valid;
  }

  get companies() {

    return this.companyService.companies;
  }

  /*
  get citiesOfSelectedState(): Array<any> {
    
    let state = this.frmSearch.controls['searchInCitiesOfState'].value;

    if (state) {

      return this.states.find(s => s.abrev == state).cities;

    } else { return []; }
  }
  */

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

    this.frmCompany = this.fb.group({
      name: [obj.name, Validators.required],
      description: [obj.description],
      logoUrl: [obj.logoUrl]
    });
  }

  async ngOnInit() {

    this.flagLoadingData = true;

    await this.companyService.loadCompanies(true);

    this.route.paramMap.subscribe(async(params) => {

      let id = params.get('id');

      if (!id || id == '' || id == 'incluir') {

        this.flagNewCompany = true;

        this.editingObj = new Company();

      } else {

        this.editingObj = await this.companyService.getCompany(id);
      }

      this.displayLogo = this.imgService.logoOf(this.editingObj);

      this.initForm(this.editingObj);

      this.flagLoadingData = false;
      
    });
  }

  updateDisplayLogo() {

    this.displayLogo = this.imgService.logoOf(this.frmCompany.value);
  }

  useDefaultLogo() {

    this.frmCompany.controls.logoUrl.setValue(null);

    this.updateDisplayLogo();
  }

  async save() {

    if (!this.flagSavingData && this.frmCompany.valid) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let company: Company = new Company(this.frmCompany.value);

      if (this.flagNewCompany) {

        company.id = 'new';

        company.ownerUserId = this.userService.user.uid;
        company.created = firebase.firestore.Timestamp.fromDate(new Date());

      } else{

        company.id = this.editingObj.id;

        company.updatedUserId = this.userService.user.uid;
        company.updated = firebase.firestore.Timestamp.fromDate(new Date());
      }

      console.log('Saving job company:', company);

      let result = await this.companyService.saveCompany(company.toDocumentObject());

      if (result.obj) {

        this.editingObj = result.obj;
      }

      this.flagNewCompany = false;

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');

      this.flagSavingData = false;
    }
  }

}
