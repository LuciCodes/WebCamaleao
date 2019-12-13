import { Injectable } from '@angular/core';

import { JobOffer } from '../models/jobOffer';

import { JobOfferMockService } from './job-offer.mock.service';
import { JobOfferFirebaseService } from './job-offer.firebase.service';
import { JobOfferSearchParams } from '../models/jobOfferSearchParams';
import { Company } from '../models/company';

@Injectable()
export class JobOfferService {

  mockAll: boolean = false;
  firebaseAll: boolean = true;

  mockFunctions: Array<string> = [];
  fbFunctions: Array<string> = ['loadJobOffers', 'searchJobOffers'];

  lastSearchParams?: JobOfferSearchParams;
  lastSearchResults?: Array<JobOffer>;

  private _jobOffers: Array<JobOffer> = [];
  
  get jobOffers(): Array<JobOffer> {

    return this._jobOffers;
  }

  userForMock(name: string): boolean {

    return (this.mockFunctions.findIndex(f => f == name) != -1);
  }

  userForFirebase(name: string): boolean {

    return (this.fbFunctions.findIndex(f => f == name) != -1);
  }

  constructor(private jobOfferMock: JobOfferMockService,
              private jobOfferFirebase: JobOfferFirebaseService) {

  }

  async getJobOffer(id: string) : Promise<JobOffer> {

    if (this.mockAll || this.userForMock('getJobOffer')) {

      return this.jobOfferMock.getJobOffer(id);
    }
    
    if (this.firebaseAll || this.userForFirebase('getJobOffer')) {
      
      return this.jobOfferFirebase.getJobOffer(id);
    }

    return null;
  }

  async loadJobOffers(forceReload: boolean = false) : Promise<Array<any>> {

    if (this.mockAll || this.userForMock('loadJobOffers')) {

      this._jobOffers = await this.jobOfferMock.loadJobOffers(forceReload);

      return this._jobOffers;
    }
    
    if (this.firebaseAll || this.userForFirebase('loadJobOffers')) {
      
      this._jobOffers = await this.jobOfferFirebase.loadJobOffers(forceReload);

      return this._jobOffers;
    }

    this._jobOffers = [];
    
    return this._jobOffers;
  }

  async searchJobOffers(filterParams?: JobOfferSearchParams, companyList?: Array<Company>) : Promise<Array<any>> {

    let filters = {};

    if (filterParams.forceReload) { this._jobOffers = null; }

    await this.loadJobOffers(filterParams.forceReload);

    let filteredSearch = [];

    console.log('searchJobOffers> ', filterParams);

    if (filterParams.text) { filterParams.text = filterParams.text.toLowerCase(); }

    for (let c = 0; c < this._jobOffers.length; c++) {

      let job = this._jobOffers[c];

      let include = true;

      if (filterParams.text) {

        include = (job.title.toLowerCase().includes(filterParams.text.toLowerCase())
                || job.description.toLowerCase().includes(filterParams.text.toLowerCase()));
      }

      if (include && filterParams.companyName && companyList) {

        let companies = companyList.filter(c => c.name.toLowerCase().includes(filterParams.companyName.toLowerCase()));

        include = (job.companyId == null || companies.findIndex(c => c.id == job.companyId) > -1);
      }
      
      if (include && filterParams.areas && filterParams.areas.length > 0) {

        include = false;

        for (let a = 0; a < filterParams.areas.length; a++) {

          include = job.areas.includes(filterParams[a]);

          if (include) break;
        }
      }
      
      if (include && filterParams.tags && filterParams.tags != '') {

        include = false;

        let tagList = filterParams.tags.split(',');

        for (let l = 0; l < tagList.length; l++) {
            
          include = job.tags.includes(tagList[l]);  //tag is case sensitive for now

          if (include) break;
        }
      }

      if (include) {

        filteredSearch.push(job);
      }
    }

    this.lastSearchResults = filteredSearch;
    this.lastSearchParams = filterParams;

    return this.lastSearchResults;
  }
  
  async saveJobOffer(jobOffer?: JobOffer): Promise<any> {
    
    let result = null;

    if (this.mockAll || this.userForMock('saveJobOffer')) {

      result = await this.jobOfferMock.saveJobOffer(jobOffer);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveJobOffer')) {
      
      result = await this.jobOfferFirebase.saveJobOffer(jobOffer);
    }
    
    if (this.lastSearchResults) {
      // updates this cache

      let idx = this.lastSearchResults.findIndex(j => j.id == jobOffer.id);

      if (idx > -1) {

        this.lastSearchResults[idx] = jobOffer;
      }
    }

    return result;
  }

  clearSearchParams() {

    this.lastSearchParams = null;
  }
}