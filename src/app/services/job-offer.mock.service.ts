import { Injectable } from '@angular/core';
import { JobOffer } from '../models/jobOffer';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JobOfferMockService {

  private _jobOfferCache: Array<JobOffer> = [];
  
  get jobOffers(): Array<JobOffer> {

    return this._jobOfferCache;
  }

  constructor(private http: HttpClient){}

  async getJobOffer(jobOfferId: string): Promise<JobOffer> {
    
    let result: JobOffer = this._jobOfferCache.find(e => e.id == jobOfferId);

    if (!result) {

      let url = `http://localhost:4200/assets/testData/jobOffer-${ jobOfferId }.json`;

      await this.http.get(url).toPromise().then(async (okResponse) => {

        let cand = new JobOffer(okResponse);

        this._jobOfferCache.push(cand);

        result = cand;

      }, (errResponse) => {});
    }

    return result;
  }

  async loadJobOffers(reload: boolean = false) : Promise<Array<JobOffer>> {
    
    if (!this._jobOfferCache || reload) {

      let url = 'http://localhost:4200/assets/testData/jobOffers.json';

      await this.http.get(url).toPromise().then((okResponse) => {

        this._jobOfferCache = (okResponse as Array<any>);

      }, (errResponse) => {

        throw({ code:errResponse.status, msg: errResponse.statusText });
      });
    }

    return this._jobOfferCache;
  }
}