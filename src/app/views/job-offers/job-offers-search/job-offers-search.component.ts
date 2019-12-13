import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AppConstants } from '../../../etc/appConstants';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { JobOfferSearchParams } from 'src/app/models/jobOfferSearchParams';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-job-offers-search',
  templateUrl: './job-offers-search.component.html',
  styleUrls: ['./job-offers-search.component.css']
})
export class JobOffersSearchComponent implements OnInit {


  get cepMask() { return AppConstants.cepMask; }

  flagLoadingData: boolean = false;

  jobOffers: Array<any>;

  companies: any = {};

  async initCache(): Promise<any> {

    await this.companyService.loadCompanies(true);

    for(let c = 0; c < this.companyService.companies.length; c++) {

      let comp = this.companyService.companies[c];

      this.companies[comp.id] = comp;
    }
  }
  
  get states(): Array<any> {

    return AppConstants.brazilianStates;
  }

  get professions(): Array<any> {

    return AppConstants.professions;
  }

  get citiesOfSelectedState(): Array<any> {
    
    let state = this.frmSearch.controls['searchInCitiesOfState'].value;

    if (state) {

      return this.states.find(s => s.abrev == state).cities;

    } else { return []; }
  }

  frmSearch = this.fb.group({
    idCpf: '',
    name: '',
    gender: '',
    sex: '',
    pcd: '',
    locationType: '',
    seachNearZip: null,
    searchInStates: null,
    searchInCities: null,
    searchInCitiesOfState: null,
    searchInProfessions: null
  });

  constructor(private jobOfferService: JobOfferService,
              private companyService: CompanyService,
              private fb: FormBuilder) {}

  async ngOnInit(): Promise<any> {

    this.flagLoadingData = true;

    await this.initCache();
    
    this.flagLoadingData = false;
  }
  
  onSubmit() {
    
    this.flagLoadingData = true;
    
    window.setTimeout(() => {
  
      let params = new JobOfferSearchParams(this.frmSearch.value);

      params.forceReload = true;

      this.jobOfferService.searchJobOffers(params).then((list) => {

        this.jobOffers = list;

        this.flagLoadingData = false;
      });
      
    }, 420);
  }

}
