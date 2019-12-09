import { Injectable } from '@angular/core';

import { JobOffer } from '../models/jobOffer';

import { JobOfferMockService } from './job-offer.mock.service';
import { JobOfferFirebaseService } from './job-offer.firebase.service';
import { JobOfferSearchParams } from '../models/jobOfferSearchParams';

@Injectable()
export class JobOfferService {

  mockAll: boolean = true;
  firebaseAll: boolean = true;

  mockFunctions: Array<string> = [];
  fbFunctions: Array<string> = ['loadJobOffers', 'searchJobOffers'];

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

  async searchJobOffers(filterParams?: JobOfferSearchParams) : Promise<Array<any>> {

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

        include = (job.description.toLowerCase().includes(filterParams.text));
      }

      if (include) {

        filteredSearch.push(job);
      }
    }

    return filteredSearch;
  }
}