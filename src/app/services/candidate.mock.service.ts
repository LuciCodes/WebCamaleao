import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate';
import { HttpClient } from '@angular/common/http';
import { CandidateDetails } from '../models/candidateDetails';
import { CandidateEducation } from '../models/candidateEducation';
import { CandidateHabilities } from '../models/candidateHabilities';
import { CandidateProfile } from '../models/candidateProfile';

@Injectable()
export class CandidateMockService {

  private _candidateCache: Array<Candidate> = [];
  private _candidateEducationCache: Array<CandidateEducation> = [];
  private _candidateHabiitiesCache: Array<CandidateHabilities> = [];
  private _candidateProfilesCache: Array<CandidateProfile> = [];
  
  get candidates(): Array<Candidate> {

    return this._candidateCache;
  }

  constructor(private http: HttpClient){}

  async getCandidateDetails(candidateId: string) : Promise<CandidateDetails> {

    let result = new CandidateDetails();

    //get from full mock first

    let url = `http://localhost:4200/assets/testData/candidateDetails-${ candidateId }.json`;
    
    try {

      await this.http.get(url).toPromise().then(async (okResponse) => {

        result = new CandidateDetails(okResponse);
  
      });

    } catch(err) {

      result.candidate = await this.getCandidate(candidateId) || new Candidate();
        
      result.candidateEducation = await this.getCandidateEducation(candidateId) || new CandidateEducation();
      
      result.candidateHabilities = await this.getCandidateHabilities(candidateId) || new CandidateHabilities();

      result.candidateProfile = await this.getCandidateProfile(candidateId) || new CandidateProfile();

    }

    return result;
    
  }

  async getCandidate(candidateId: string): Promise<Candidate> {
    
    let result: Candidate = this._candidateCache.find(e => e.id == candidateId);

    if (!result) {

      let url = `http://localhost:4200/assets/testData/candidate-${ candidateId }.json`;

      await this.http.get(url).toPromise().then(async (okResponse) => {

        let cand = new Candidate(okResponse);

        this._candidateCache.push(cand);

        result = cand;

      }, (errResponse) => {});
    }

    return result;
  }

  async getCandidateEducation(candidateId: string): Promise<CandidateEducation> {
        
    let result: CandidateEducation = this._candidateEducationCache.find(e => e.candidateId == candidateId);

    if (!result) {

      let url = `http://localhost:4200/assets/testData/candidateEducation-${ candidateId }.json`;

      await this.http.get(url).toPromise().then(async (okResponse) => {

        let edu = new CandidateEducation(okResponse);

        this._candidateEducationCache.push(edu);

        result = edu;

      }, (errResponse) => {});
    }

    return result;
  }
  
  async getCandidateHabilities(candidateId: string): Promise<CandidateHabilities> {
        
    let result: CandidateHabilities = this._candidateHabiitiesCache.find(e => e.candidateId == candidateId);

    if (!result) {

      let url = `http://localhost:4200/assets/testData/candidateHabilities-${ candidateId }.json`;

      await this.http.get(url).toPromise().then(async (okResponse) => {

        let habs = new CandidateHabilities(okResponse);

        this._candidateHabiitiesCache.push(habs);

        result = habs;

      }, (errResponse) => {});
    }

    return result;
  }

  async getCandidateProfile(candidateId: string): Promise<CandidateProfile> {
        
    let result: CandidateProfile = this._candidateProfilesCache.find(e => e.candidateId == candidateId);

    if (!result) {

      let url = `http://localhost:4200/assets/testData/candidateProfile-${ candidateId }.json`;

      await this.http.get(url).toPromise().then(async (okResponse) => {

        let prof = new CandidateProfile(okResponse);

        this._candidateProfilesCache.push(prof);

        result = prof;

      }, (errResponse) => {});
    }

    return result;
  }

  async loadCandidates(reload: boolean = false) : Promise<Array<Candidate>> {
    
    if (!this._candidateCache || reload) {

      let url = 'http://localhost:4200/assets/testData/candidates.json';

      await this.http.get(url).toPromise().then((okResponse) => {

        this._candidateCache = (okResponse as Array<any>);

      }, (errResponse) => {

        throw({ code:errResponse.status, msg: errResponse.statusText });
      });
    }

    return this._candidateCache;
  }
}