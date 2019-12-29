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
  selector: 'app-job-offers-detail',
  templateUrl: './job-offers-detail.component.html',
  styleUrls: ['./job-offers-detail.component.css']
})
export class JobOffersDetailComponent implements OnInit {

  public flagSavingData = false;
  public flagLoadingData = false;

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

  companies: any = {};

  async initCache(): Promise<any> {

    await this.companyService.loadCompanies(true);

    for(let c = 0; c < this.companyService.companies.length; c++) {

      let comp = this.companyService.companies[c];

      this.companies[comp.id] = comp;
    }
  }

  constructor(public location: Location,
              private companyService: CompanyService,
              private jobOfferService: JobOfferService,
              private route: ActivatedRoute) {

  }

  async ngOnInit() {

    this.flagLoadingData = true;

    await this.initCache();

    this.route.paramMap.subscribe(async(params) => {

      let id = params.get('id');

      if (id && id != '') {

        this.editingObj = await this.jobOfferService.getJobOffer(id);
      }

      this.flagLoadingData = false;
    });
  }

}
