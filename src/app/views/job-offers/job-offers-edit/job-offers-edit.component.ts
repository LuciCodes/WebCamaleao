import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobOffer } from 'src/app/models/jobOffer';
import { JobOfferService } from 'src/app/services/job-offer.service';
import {Location} from '@angular/common';
import { AppConstants } from 'src/app/etc/appConstants';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-job-offers-edit',
  templateUrl: './job-offers-edit.component.html',
  styleUrls: ['./job-offers-edit.component.css']
})
export class JobOffersEditComponent implements OnInit {

  flagSavingData = false;
  flagLoadingData = false;

  flagNewJobOffer = false;

  offerDescription: string;

  frmJobOffer: any;

  editingObj: JobOffer;

  get cepMask() { return AppConstants.cepMask; }

  get jobOfferLevels(): Array<any> {

    return AppConstants.jobOfferLevels;
  }

  get jobOfferTypes(): Array<any> {

    return AppConstants.jobOfferTypes;
  }

  get states(): Array<any> {

    return AppConstants.brazilianStates;
  }

  get professions(): Array<any> {

    return AppConstants.professions;
  }

  get basicSkills(): Array<any> {

    return AppConstants.basicSkills;
  }

  get isValid(): boolean {

    return this.frmJobOffer && this.frmJobOffer.valid;
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
              private userService: UserService,
              private jobOfferService: JobOfferService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {

    this.initForm();
  }

  initForm(obj?: any) {
    
    if (!obj) { obj = {}; }

    this.frmJobOffer = this.fb.group({
      companyId: [obj.companyId],
      companyName: [obj.companyName, Validators.required],
      companyAuxId: [obj.companyAuxId],
      id: [obj.id || 'new'],
      title: [obj.title, Validators.required],
      level: [obj.level, Validators.required],
      description: [obj.description, Validators.required],
      jobOfferType: [obj.jobOfferType, Validators.required],
      areas: [null],
      habilities: [null],
      tags: [null]
    });
  }

  async ngOnInit() {

    this.flagLoadingData = true;

    await this.companyService.loadCompanies(true);

    this.route.paramMap.subscribe(async(params) => {

      let id = params.get('id');

      if (!id || id == '' || id == 'incluir') {

        this.flagNewJobOffer = true;

        this.editingObj = new JobOffer();

      } else {

        this.editingObj = await this.jobOfferService.getJobOffer(id);
      }

      this.initForm(this.editingObj);

      this.flagLoadingData = false;
      
    });
  }

  selectCompany(company: Company) {

    this.frmJobOffer.controls.companyId.value = company.id;
    this.frmJobOffer.controls.companyName.setValue(company.name);

    //todo: onchange da input controls.companyId.value tem que sumir
  }
  
  async save() {

    if (!this.flagSavingData && this.frmJobOffer.valid) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let offer: JobOffer = new JobOffer(this.frmJobOffer.value);

      if (this.flagNewJobOffer) {

        offer.id = 'new';

        offer.ownerUserId = this.userService.user.uid;
        offer.created = firebase.firestore.Timestamp.fromDate(new Date());

      } else{

        offer.id = this.editingObj.id;

        offer.updatedUserId = this.userService.user.uid;
        offer.updated = firebase.firestore.Timestamp.fromDate(new Date());
      }

      console.log('Saving job offer:', offer);

      let result = await this.jobOfferService.saveJobOffer(offer.toDocumentObject());

      if (result.obj) {

        this.editingObj = result.obj;
      }

      this.flagNewJobOffer = false;

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');

      this.flagSavingData = false;
    }
  }

}
