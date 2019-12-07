import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Candidate } from '../models/candidate';
import * as firebase from 'firebase';
import { CandidateProfile } from '../models/candidateProfile';
import { CandidateHabilities } from '../models/candidateHabilities';
import { CandidateEducation } from '../models/candidateEducation';
import { WorkExperience } from '../models/workExperience';
import { UserProfile } from '../models/userProfile';
import { CandidateMockService } from './candidate.mock.service';
import { CandidateFirebaseService } from './candidate.firebase.service';
import { CandidateSearchParams } from '../models/candidateSearchParams';

@Injectable()
export class CandidateService {

  mockAll: boolean = false;
  firebaseAll: boolean = false;

  mockFunctions: Array<string> = [];
  fbFunctions: Array<string> = ['loadCandidates', 'searchCandidates'];

  private _candidates: Array<Candidate> = [];

  get candidates(): Array<Candidate> {

    return this._candidates;
  }

  userForMock(name: string): boolean {

    return (this.mockFunctions.findIndex(f => f == name) != -1);
  }

  userForFirebase(name: string): boolean {

    return (this.fbFunctions.findIndex(f => f == name) != -1);
  }

  constructor(private fireAuth: AngularFireAuth,
              private fireDb: AngularFirestore,
              private candidateMock: CandidateMockService,
              private candidateFirebase: CandidateFirebaseService) {

  }

  async loadCandidates() : Promise<Array<any>> {

    if (this.mockAll || this.userForMock('loadCandidates')) {

      this._candidates = await this.candidateMock.loadCandidates();

      return this._candidates;
    }
    
    if (this.firebaseAll || this.userForFirebase('loadCandidates')) {
      
      this._candidates = await this.candidateFirebase.loadCandidates();

      return this._candidates;
    }

    this._candidates = [];
    
    return this._candidates;
  }

  async searchCandidates(filterParams?: CandidateSearchParams) : Promise<Array<any>> {

    let filters = {};

    if (filterParams.forceReload) { this._candidates = null; }

    await this.loadCandidates();

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
      
      if (include && filterParams.pcd) {

        include = cand.pcd;
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

    return filteredSearch;
  }
}