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
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-companies-detail',
  templateUrl: './companies-detail.component.html',
  styleUrls: ['./companies-detail.component.css']
})
export class CompaniesDetailComponent implements OnInit {

  public flagSavingData = false;
  public flagLoadingData = false;

  offerDescription: string;

  frmCompany: any;

  editingObj: Company;

  get isValid(): boolean {

    return this.frmCompany && this.frmCompany.valid;
  }

  companies: any = {};

  constructor(public location: Location,
              private companyService: CompanyService,
              private imgService: ImageService,
              private route: ActivatedRoute) {

  }

  async ngOnInit() {

    this.flagLoadingData = true;

    await this.companyService.loadCompanies(true);

    this.route.paramMap.subscribe(async(params) => {

      let id = params.get('id');

      if (id && id != '') {

        this.editingObj = await this.companyService.getCompany(id);
      }

      this.flagLoadingData = false;
    });
  }

  public logoOf(obj?: any) {

    return this.imgService.logoOf(obj);
  }
}
