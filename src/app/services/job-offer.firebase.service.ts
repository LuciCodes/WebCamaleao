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
      
      let jobofferResult = await this.fireDb.collection('jobOffers').get().toPromise();

      let results = [];

      for(let d = 0; d < jobofferResult.docs.length; d++) {

        results.push(new JobOffer(jobofferResult.docs[d].data()));
        
        results[d].id = jobofferResult.docs[d].id;
      }

      this._jobofferCache = results;
    }

    return this._jobofferCache;
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