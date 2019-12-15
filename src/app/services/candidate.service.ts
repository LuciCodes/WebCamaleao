import { Injectable } from '@angular/core';

import { Candidate } from '../models/candidate';

import { CandidateMockService } from './candidate.mock.service';
import { CandidateFirebaseService } from './candidate.firebase.service';
import { CandidateSearchParams } from '../models/candidateSearchParams';
import { CandidateDetails } from '../models/candidateDetails';
import { CandidateProfile } from '../models/candidateProfile';
import { CandidateHabilities } from '../models/candidateHabilities';
import { CandidateEducation } from '../models/candidateEducation';
import { WorkExperience } from '../models/workExperience';

@Injectable()
export class CandidateService {

  mockAll: boolean = false;
  firebaseAll: boolean = true;

  mockFunctions: Array<string> = [];
  fbFunctions: Array<string> = ['loadCandidates', 'searchCandidates'];

  lastSearchParams?: CandidateSearchParams;
  lastSearchResults?: Array<Candidate>;
  
  private _candidates: Array<Candidate> = [];

  private _detailsCache: Array<CandidateDetails> = [];
  
  public editingCandidate: CandidateDetails;

  get candidates(): Array<Candidate> {

    return this._candidates;
  }

  userForMock(name: string): boolean {

    return (this.mockFunctions.findIndex(f => f == name) != -1);
  }

  userForFirebase(name: string): boolean {

    return (this.fbFunctions.findIndex(f => f == name) != -1);
  }

  constructor(private candidateMock: CandidateMockService,
              private candidateFirebase: CandidateFirebaseService) {

  }

  async getCandidateDetails(candidateId: string) : Promise<CandidateDetails> {

    let result: CandidateDetails = this._detailsCache.find(r => r.candidate && r.candidate.id == candidateId);

    if (!result) {

      if (this.mockAll || this.userForMock('loadCandidates')) {

        result = await this.candidateMock.getCandidateDetails(candidateId);
  
        this._detailsCache.push(result);
  
        return result;
     }
      
      if (this.firebaseAll || this.userForFirebase('loadCandidates')) {
        
        result = await this.candidateFirebase.getCandidateDetails(candidateId);
        
        this._detailsCache.push(result);
        
        return result;
      }
    }

    return result;
  }

  async loadCandidates(forceReload: boolean = false) : Promise<Array<any>> {

    if (this.mockAll || this.userForMock('loadCandidates')) {

      this._candidates = await this.candidateMock.loadCandidates(forceReload);

      return this._candidates;
    }
    
    if (this.firebaseAll || this.userForFirebase('loadCandidates')) {
      
      this._candidates = await this.candidateFirebase.loadCandidates(forceReload);

      return this._candidates;
    }

    this._candidates = [];
    
    return this._candidates;
  }

  async searchCandidates(filterParams?: CandidateSearchParams) : Promise<Array<any>> {

    let filters = {};

    if (filterParams.forceReload) { this._candidates = null; }

    await this.loadCandidates(filterParams.forceReload);

    let filteredSearch = [];

    console.log('searchCandidates> ', filterParams);

    for (let c = 0; c < this._candidates.length; c++) {

      let cand = this._candidates[c];

      let include = true;

      if (filterParams.idCpf) {

        if (filterParams.idCpf.length <= 11) {

          // cpf
          include = (cand.cpf == filterParams.idCpf);

        } else {

          //id
          include = (cand.id == filterParams.idCpf);
        }
      }

      if (include && filterParams.name && filterParams.name != '') {

        include = (cand.name.toLowerCase().includes(filterParams.name.toLowerCase()));
      }

      if (include && filterParams.genders && filterParams.genders.length > 0) {

        include = (filterParams.genders.includes(cand.gender));
      }
      
      if (include && filterParams.sexes && filterParams.sexes.length > 0) {

        include = (filterParams.sexes.includes(cand.sex));
      }
      
      if (include && filterParams.searchInStates && filterParams.searchInStates.length > 0) {

        include = (filterParams.searchInStates.includes(cand.addrState));
      }
      
      if (include && filterParams.searchInCities && filterParams.searchInCities.length > 0) {

        include = (filterParams.searchInStates.includes(cand.addrState)
                && filterParams.searchInCities.includes(cand.addrCity));
      }

      if (include) {

        filteredSearch.push(cand);

        console.log('searchCandidates> added', cand);
      }
    }

    this.lastSearchResults = filteredSearch;
    this.lastSearchParams = filterParams;

    return this.lastSearchResults;
  }
  
  clearSearchParams() {

    this.lastSearchParams = null;
  }

  async saveEditingCandidate() {

    let result: any = {};

    if (this.mockAll || this.userForMock('saveEditingCandidate')) {

      result = await this.candidateMock.saveCandidate(this.editingCandidate);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveEditingCandidate')) {
      
      result = await this.candidateFirebase.saveCandidate(this.editingCandidate.toDocumentObject());

    }

    return result;
  }
  
  async saveCandidate(candidateDetails?: CandidateDetails): Promise<any> {

    if (this.mockAll || this.userForMock('saveCandidate')) {

      return await this.candidateMock.saveCandidate(candidateDetails);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveCandidate')) {
      
      return await this.candidateFirebase.saveCandidate(candidateDetails.toDocumentObject());

    }

    return null;
  }
  
  async saveCandidateBasicInfo(candidate?: Candidate): Promise<any> {

    if (this.mockAll || this.userForMock('saveCandidateBasicInfo')) {

      return await this.candidateMock.saveCandidateBasicInfo(candidate);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveCandidateBasicInfo')) {
      
      return await this.candidateFirebase.saveCandidateBasicInfo(candidate);

    }

    return null;
  }
  
  async saveCandidateProfile(candidateProfile?: CandidateProfile): Promise<any> {

    if (this.mockAll || this.userForMock('saveCandidateProfile')) {

      return await this.candidateMock.saveCandidateProfile(candidateProfile);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveCandidateProfile')) {
      
      return await this.candidateFirebase.saveCandidateProfile(candidateProfile);

    }

    return null;
  }
  
  async saveCandidateHabilities(candidateHabilities?: CandidateHabilities): Promise<any> {

    if (this.mockAll || this.userForMock('saveCandidateProfile')) {

      return await this.candidateMock.saveCandidateHabilities(candidateHabilities);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveCandidateHabilities')) {
      
      return await this.candidateFirebase.saveCandidateHabilities(candidateHabilities);

    }

    return null;
  }
  
  async saveCandidateEducation(candidateEducation?: CandidateEducation): Promise<any> {

    if (this.mockAll || this.userForMock('saveCandidateEducation')) {

      return await this.candidateMock.saveCandidateEducation(candidateEducation);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveCandidateEducation')) {
      
      return await this.candidateFirebase.saveCandidateEducation(candidateEducation.toDocumentObject());

    }

    return null;
  }
  
  async removeCandidateWorkExperience(candidateId: string, workExperience?: WorkExperience): Promise<any> {

    if (this.mockAll || this.userForMock('saveCandidateEducation')) {

      return await this.candidateMock.removeCandidateWorkExperience(candidateId, workExperience);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveCandidateEducation')) {
      
      return await this.candidateFirebase.removeCandidateWorkExperience(candidateId, workExperience);

    }

    return null;
  }

  async saveCandidateWorkExperiences(workExperiences?: Array<WorkExperience>): Promise<any> {

    let results = [];

    for (let e = 0; e < workExperiences.length; e++) {

      results.push(await this.saveCandidateWorkExperience(workExperiences[e]));
    }

    return results;
  }

  async saveCandidateWorkExperience(workExperience?: WorkExperience): Promise<any> {

    if (this.mockAll || this.userForMock('saveCandidateWorkExperience')) {

      return await this.candidateMock.saveCandidateWorkExperience(workExperience);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveCandidateWorkExperience')) {
      
      return await this.candidateFirebase.saveCandidateWorkExperience(workExperience);

    }

    return null;
  }
}