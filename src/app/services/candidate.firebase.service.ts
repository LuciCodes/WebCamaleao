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
  
  async saveCandidate(candidateDetails?: CandidateDetails): Promise<any> {

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true, obj: {} };

    saveResult.obj['saveBasicInfoResult'] = await this.saveCandidateBasicInfo(candidateDetails.candidate);
    saveResult.obj['saveCandidateProfileResult'] = await this.saveCandidateProfile(candidateDetails.candidateProfile);
    saveResult.obj['saveCandidateHabilitiesResult'] = await this.saveCandidateHabilities(candidateDetails.candidateHabilities);
    saveResult.obj['saveCandidateEducationResult'] = await this.saveCandidateEducation(candidateDetails.candidateEducation);
    saveResult.obj['saveCandidateWorkExperiencesResult'] = await this.saveCandidateWorkExperiences(candidateDetails.candidateExperience);

    return saveResult;
  }
  
  async saveCandidateBasicInfo(candidate?: Candidate): Promise<any> {

    if (candidate.toDocumentObject) { candidate = candidate.toDocumentObject() };

    candidate.updated = firebase.firestore.Timestamp.fromDate(new Date());

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true, obj: null };

    try 
    {
      await this.fireDb.collection('candidates')
                                      .doc(candidate.id)
                                      .set(candidate, { merge: true });
                                        
      saveResult.obj = candidate;

      let idx = this._candidateCache.findIndex(c => c.id == candidate.id);

      if (idx > -1) { this._candidateCache[idx] = candidate; }
    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }
  
  async saveCandidateProfile(candidateProfile?: CandidateProfile): Promise<any> {

    if (candidateProfile.toDocumentObject) { candidateProfile = candidateProfile.toDocumentObject() };

    candidateProfile.updated = firebase.firestore.Timestamp.fromDate(new Date());

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true, obj: null };

    try 
    {
      await this.fireDb.collection('candidateProfiles')
                                      .doc(candidateProfile.id)
                                      .set(candidateProfile, { merge: true });
                                        
      saveResult.obj = candidateProfile;
      
      let idx = this._candidateProfilesCache.findIndex(p => p.id == candidateProfile.id);

      if (idx > -1) { this._candidateProfilesCache[idx] = candidateProfile; }
    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }
  
  async saveCandidateHabilities(candidateHabilities?: CandidateHabilities): Promise<any> {

    if (candidateHabilities.toDocumentObject) { candidateHabilities = candidateHabilities.toDocumentObject() };

    candidateHabilities.updated = firebase.firestore.Timestamp.fromDate(new Date());

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true, obj: null };

    try 
    {
      await this.fireDb.collection('candidateHabilities')
                                      .doc(candidateHabilities.id)
                                      .set(candidateHabilities, { merge: true });
        
      saveResult.obj = candidateHabilities;
      
      let idx = this._candidateHabiitiesCache.findIndex(p => p.id == candidateHabilities.id);

      if (idx > -1) { this._candidateHabiitiesCache[idx] = candidateHabilities; }
    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }
  
  async saveCandidateEducation(candidateEducation?: any): Promise<any> {

    if (candidateEducation.toDocumentObject) { candidateEducation = candidateEducation.toDocumentObject() };

    candidateEducation.updated = firebase.firestore.Timestamp.fromDate(new Date());

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true, obj: null };

    try 
    {
      await this.fireDb.collection('candidateEducation')
                                      .doc(candidateEducation.id)
                                      .set(candidateEducation, { merge: true });

      saveResult.obj = candidateEducation;
      
      let idx = this._candidateEducationCache.findIndex(p => p.id == candidateEducation.id);

      if (idx > -1) { this._candidateEducationCache[idx] = candidateEducation; }
    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }
  
  async removeCandidateWorkExperience(candidateId: string, workExperience?: WorkExperience): Promise<any> {

    let expQuery = await this.fireDb.collection('candidateWorkExperiences').ref.where('candidateId', "==", candidateId);

    let expResult = await expQuery.get();

    if (!expResult.empty) {

      let existingExp = expResult.docs.find(d => d.id == workExperience.id);

      if (existingExp) {

        await this.fireDb.collection('candidateWorkExperiences').doc(existingExp.id).delete();
      }
    }
  }

  async saveCandidateWorkExperiences(workExperiences?: Array<any>): Promise<any> {

    let results = [];

    for (let e = 0; e < workExperiences.length; e++) {

      results.push(await this.saveCandidateWorkExperience(workExperiences[e]));
    }

    return results;
  }

  async saveCandidateWorkExperience(workExperience?: any): Promise<any> {

    if (workExperience.toDocumentObject) { workExperience = workExperience.toDocumentObject() };

    workExperience.updated = firebase.firestore.Timestamp.fromDate(new Date());

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true, obj: null };

    try 
    {
      let obj = workExperience.toDocumentObject();

      let newExpRef = await this.fireDb.collection('candidateWorkExperiences').add(obj);

      workExperience.id = newExpRef.id;

      saveResult.obj = workExperience;

      let idx = this._workExperienceCache.findIndex(p => p.id == workExperience.id);

      if (idx > -1) { this._workExperienceCache[idx] = workExperience; }
    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }
}