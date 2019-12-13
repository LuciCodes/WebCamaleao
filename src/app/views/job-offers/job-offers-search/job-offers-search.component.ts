import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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

    if (this.companyService.companies.length == 0) {

      this.flagLoadingData = true;

      await this.companyService.loadCompanies(true);

      console.log('Loaded companies:', this.companies);
    }
    
    for(let c = 0; c < this.companyService.companies.length; c++) {
  
      let comp = this.companyService.companies[c];

      this.companies[comp.id] = comp;
    }
    
    this.flagLoadingData = false;
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

  frmSearch: FormGroup;

  constructor(private jobOfferService: JobOfferService,
              private companyService: CompanyService,
              private fb: FormBuilder) {}

  async ngOnInit(): Promise<any> {

    await this.initCache();

    this.initForm(this.jobOfferService.lastSearchParams || {});
    
    if (this.jobOfferService.lastSearchResults) {

      this.jobOffers = this.jobOfferService.lastSearchResults;
    }
  }
  
  initForm(obj: any) {

    this.frmSearch = this.fb.group({
      text: [obj.text],
      companyId: [obj.companyId],
      companyName: [obj.companyName],
      areas: [obj.areas],
      tags: [obj.tags],
      locationType: [obj.locationType],
      seachNearZip: [obj.seachNearZip],
      searchInStates: [obj.searchInStates],
      searchInCities: [obj.searchInCities],
      searchInCitiesOfState: [obj.searchInCitiesOfState],
      searchInProfessions: [obj.searchInProfessions],
      searchLogic: [obj.searchLogic || 'AND']
    });
  }

  search() {
    
    this.flagLoadingData = true;
    
    window.setTimeout(() => {
  
      let params = new JobOfferSearchParams(this.frmSearch.value);

      params.forceReload = true;

      this.jobOfferService.searchJobOffers(params, this.companyService.companies).then((list) => {

        this.jobOffers = list;

        this.flagLoadingData = false;
      });
      
    }, 420);
  }

  clearParams() {

    this.jobOfferService.clearSearchParams();

    this.initForm({});
  }
}
