import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Candidate } from '../models/candidate';
import * as firebase from 'firebase';
import { CandidateProfile } from '../models/candidateProfile';
import { CandidateHabilities } from '../models/candidateHabilities';
import { CandidateEducation } from '../models/candidateEducation';
import { WorkExperience } from '../models/workExperience';
import { UserProfile } from '../models/userProfile';

@Injectable()
export class CandidateFirebaseService {

  private _candidates: Array<Candidate>;

  get candidates(): Array<Candidate> {

    return this._candidates;
  }

  constructor(private fireAuth: AngularFireAuth,
              private fireDb: AngularFirestore) {

  }

  async getCandidate(candidateId: string): Promise<Candidate> {
    
    let candidateQuery = await this.fireDb.collection('candidates').ref.where('id', '==', candidateId);

    let candidateResult = await candidateQuery.get();

    if (!candidateResult.empty) {

      /*
      this.candidate = (new Candidate(candidateResult.docs[0].data()));

      this.candidate.id = candidateResult.docs[0].id;
      
      console.log('Loaded user candidate:', this.candidate);
      */
    }

    return null;
  }
  
  async loadCandidates(reload: boolean = false): Promise<Array<Candidate>> {
    
    if (!this._candidates || reload) {
      
      let candidateQuery = await this.fireDb.collection('candidates').ref.where('signupState', '==', 'COMPLETED').orderBy('id');

      let candidateResult = await candidateQuery.get();

      if (!candidateResult.empty) {

        let results = [];

        for(let d = 0; d < candidateResult.docs.length; d++) {

          results.push(new Candidate(candidateResult.docs[d].data()));
          
          results[d].id = candidateResult.docs[d].id;
        }

        this._candidates = results;

      } else {

        this._candidates = [];
      }
    }

    return this._candidates;
  }
}