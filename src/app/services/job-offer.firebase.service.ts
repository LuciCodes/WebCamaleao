import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { JobOffer } from '../models/jobOffer';
import * as firebase from 'firebase';

@Injectable()
export class JobOfferFirebaseService {

  private _jobOfferCache: Array<JobOffer> = [];

  get jobOffers(): Array<JobOffer> {

    return this._jobOfferCache;
  }

  constructor(private fireAuth: AngularFireAuth,
              private fireDb: AngularFirestore) {

  }

  async getJobOffer(jobOfferId: string): Promise<JobOffer> {
    
    let result: JobOffer = this._jobOfferCache.find(e => e.id == jobOfferId);

    if (!result) {

      let jobOfferQuery = await this.fireDb.collection('jobOffers').doc(jobOfferId);

      let jobOfferResult = await jobOfferQuery.get().toPromise();
  
      if (jobOfferResult) {
  
        result = new JobOffer({ id: jobOfferResult.id, ...jobOfferResult.data() });
      }
    }

    return result;
  }
  
  async loadJobOffers(reload: boolean = false): Promise<Array<JobOffer>> {
    
    if (!this._jobOfferCache || reload) {
      
      let jobOfferResult = await this.fireDb.collection('jobOffers').get().toPromise();

      let results = [];

      for(let d = 0; d < jobOfferResult.docs.length; d++) {

        results.push(new JobOffer({ id: jobOfferResult.docs[d].id, ...jobOfferResult.docs[d].data() }));
        
        results[d].id = jobOfferResult.docs[d].id;
      }

      this._jobOfferCache = results;
    }

    return this._jobOfferCache;
  }
  
  async saveJobOffer(jobOffer?: JobOffer): Promise<any> {

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true, obj: null };

    try 
    {
      if (jobOffer.id == 'new') {

        delete jobOffer['id'];

        let newObjRef = await this.fireDb.collection('jobOffers').add(jobOffer);

        jobOffer.id = newObjRef.id;

      } else {

        await this.fireDb.collection('jobOffers')
                                      .doc(jobOffer.id)
                                      .set(jobOffer, { merge: true });
      }

      saveResult.obj = jobOffer;
    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }
}