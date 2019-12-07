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
import { CandidateDetails } from '../models/candidateDetails';

@Injectable()
export class CandidateFirebaseService {

  private _candidateCache: Array<Candidate> = [];
  private _candidateEducationCache: Array<CandidateEducation> = [];
  private _candidateHabiitiesCache: Array<CandidateHabilities> = [];
  private _candidateProfilesCache: Array<CandidateProfile> = [];
  private _workExperienceCache: Array<any> = [];

  get candidates(): Array<Candidate> {

    return this._candidateCache;
  }

  constructor(private fireAuth: AngularFireAuth,
              private fireDb: AngularFirestore) {

  }

  async getCandidateDetails(candidateId: string) : Promise<CandidateDetails> {

    let result = new CandidateDetails();

    result.candidate = await this.getCandidate(candidateId);
    
    result.candidateEducation = await this.getCandidateEducation(candidateId);
    
    result.candidateHabilities = await this.getCandidateHabilities(candidateId);

    result.candidateProfile = await this.getCandidateProfile(candidateId);
    
    result.candidateExperience = await this.getCandidateExperience(candidateId);

    return result;
  }
  
  async getCandidate(candidateId: string): Promise<Candidate> {
    
    let result: Candidate = this._candidateCache.find(e => e.id == candidateId);

    if (!result) {

      let candidateQuery = await this.fireDb.collection('candidates').doc(candidateId);

      let candidateResult = await candidateQuery.get().toPromise();
  
      if (candidateResult) {
  
        result = new Candidate(candidateResult.data());
      }
    }

    return result;
  }
  
  async getCandidateEducation(candidateId: string): Promise<CandidateEducation> {
    
    let result: CandidateEducation = this._candidateEducationCache.find(e => e.candidateId == candidateId);

    if (!result) {

      let candidateQuery = await this.fireDb.collection('candidateEducation').ref.where('candidateId', '==', candidateId);

      let candidateResult = await candidateQuery.get();
  
      if (!candidateResult.empty) {
  
        result = new CandidateEducation(candidateResult.docs[0].data());
      }
    }

    return result;
  }
  
  async getCandidateExperience(candidateId: string): Promise<Array<WorkExperience>> {
        
    let exp = this._workExperienceCache.find(w => w.candidateId == candidateId);

    let result;

    if (!exp) {

      let candidateQuery = await this.fireDb.collection('candidateWorkExperiences').ref.where('candidateId', '==', candidateId);

      let candidateResult = await candidateQuery.get();
  
      result = [];

      if (!candidateResult.empty) {
  
        for(let d = 0; d < candidateResult.docs.length; d++) {

          result.push(new WorkExperience(candidateResult.docs[d].data()));
        }
      }
        
      this._workExperienceCache.push({ candidateId: candidateId, experience: result });

    } else {

      result = exp.experience;
    }

    return result;
  }

  async getCandidateHabilities(candidateId: string): Promise<CandidateHabilities> {
    
    let result: CandidateHabilities = this._candidateHabiitiesCache.find(e => e.candidateId == candidateId);

    if (!result) {

      let candidateQuery = await this.fireDb.collection('candidateHabilities').ref.where('candidateId', '==', candidateId);
  
      let candidateResult = await candidateQuery.get();
  
      if (!candidateResult.empty) {
  
        result = new CandidateHabilities(candidateResult.docs[0].data());
      }
    }

    return result;
  }
  
  async getCandidateProfile(candidateId: string): Promise<CandidateProfile> {

    let result: CandidateProfile = this._candidateProfilesCache.find(e => e.candidateId == candidateId);

    if (!result) {    

      let candidateQuery = await this.fireDb.collection('candidateProfiles').ref.where('candidateId', '==', candidateId);
  
      let candidateResult = await candidateQuery.get();
  
      if (!candidateResult.empty) {
  
        return new CandidateProfile(candidateResult.docs[0].data());
      }
    }

    return result;
  }

  async loadCandidates(reload: boolean = false): Promise<Array<Candidate>> {
    
    if (!this._candidateCache || reload) {
      
      let candidateQuery = await this.fireDb.collection('candidates').ref.where('signupState', '==', 'COMPLETED').orderBy('id');

      let candidateResult = await candidateQuery.get();

      if (!candidateResult.empty) {

        let results = [];

        for(let d = 0; d < candidateResult.docs.length; d++) {

          results.push(new Candidate(candidateResult.docs[d].data()));
          
          results[d].id = candidateResult.docs[d].id;
        }

        this._candidateCache = results;

      } else {

        this._candidateCache = [];
      }
    }

    return this._candidateCache;
  }
}