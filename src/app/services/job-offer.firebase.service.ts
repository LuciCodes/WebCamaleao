import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { JobOffer } from '../models/joboffer';
import * as firebase from 'firebase';

@Injectable()
export class JobOfferFirebaseService {

  private _jobofferCache: Array<JobOffer> = [];

  get joboffers(): Array<JobOffer> {

    return this._jobofferCache;
  }

  constructor(private fireAuth: AngularFireAuth,
              private fireDb: AngularFirestore) {

  }

  async getJobOffer(jobofferId: string): Promise<JobOffer> {
    
    let result: JobOffer = this._jobofferCache.find(e => e.id == jobofferId);

    if (!result) {

      let jobofferQuery = await this.fireDb.collection('jobOffers').doc(jobofferId);

      let jobofferResult = await jobofferQuery.get().toPromise();
  
      if (jobofferResult) {
  
        result = new JobOffer(jobofferResult.data());
      }
    }

    return result;
  }
  
  async loadJobOffers(reload: boolean = false): Promise<Array<JobOffer>> {
    
    if (!this._jobofferCache || reload) {
      
      let jobofferQuery = await this.fireDb.collection('jobOffers').ref.where('id', '==', 'id');

      let jobofferResult = await jobofferQuery.get();

      if (!jobofferResult.empty) {

        let results = [];

        for(let d = 0; d < jobofferResult.docs.length; d++) {

          results.push(new JobOffer(jobofferResult.docs[d].data()));
          
          results[d].id = jobofferResult.docs[d].id;
        }

        this._jobofferCache = results;

      } else {

        this._jobofferCache = [];
      }
    }

    return this._jobofferCache;
  }
}