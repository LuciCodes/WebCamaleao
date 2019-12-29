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
import { Experience } from '../models/experience';
import { UserProfile } from '../models/userProfile';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AppConstants } from '../etc/appConstants';
import { UserSearchParams } from '../models/userSearchParams';

@Injectable()
export class UserMockService {

  user: any = {};
  userToken: any = {};
  candidate: Candidate = new Candidate();
  candidateProfile: CandidateProfile = new CandidateProfile();
  candidateHabilities: CandidateHabilities = new CandidateHabilities();
  candidateEducation: CandidateEducation = new CandidateEducation();

  candidateExperiences: Array<Experience> = [];

  loading = false;

  userProfiles: Array<UserProfile> = [];

  users: Array<any> = [];
  
  lastSearchParams?: UserSearchParams;
  lastSearchResults?: Array<any>;

  public searchPage = 1;
  public searchPageSize = 5;
  
  get hasUser(): boolean { return this.user != null; }

  get userRole(): string {

    return this.userToken.claims['userRole'] || AppConstants.userRoles.candidate;
  }

  get userIsCandidate(): boolean {

    return (this.hasUser && this.userRole == AppConstants.userRoles.candidate);
  }
  
  get userIsCompanyStaff(): boolean {

    return (this.hasUser && [AppConstants.userRoles.cadmin, AppConstants.userRoles.cstaff].includes(this.userRole));
  }

  get userIsAdmin(): boolean {

    return (this.hasUser && this.userRole == AppConstants.userRoles.admin);
  }

  get userIsStaff(): boolean {

    return (this.hasUser && [AppConstants.userRoles.staff, AppConstants.userRoles.admin].includes(this.userRole));
  }

  get userIsCompanyAdmin(): boolean {

    return (this.hasUser && this.userRole == AppConstants.userRoles.cadmin);
  }

  constructor() {
  }

  async loadUserCandidate() {
    
  }

  async loadUserCandidateProfile() {
    
  }

  async loadUserCandidateHabilities() {
    
  }

  async loadUserCandidateEducation() {
    
  }

  async loadUsercandidateExperiences() {
    
  }

  async saveUserCandidate(candidate?: Candidate): Promise<any> {

    return new Promise((resolve, reject) => { resolve({}); });
  }
  
  async saveUserCandidateProfile(candidateProfile?: CandidateProfile): Promise<any> {

    return new Promise((resolve, reject) => { resolve({}); });
  }
  
  async saveUserCandidateHabilities(candidateHabilities?: CandidateHabilities): Promise<any> {

    return new Promise((resolve, reject) => { resolve({}); });
  }
  
  async saveUserCandidateEducation(candidateEducation?: CandidateEducation): Promise<any> {

    return new Promise((resolve, reject) => { resolve({}); });
  }
  
  async removeUsercandidateExperience(experience?: Experience): Promise<any> {

    return new Promise((resolve, reject) => { resolve({}); });
  }

  async saveUsercandidateExperience(experience?: Experience): Promise<any> {

    return new Promise((resolve, reject) => { resolve({}); });
  }

  async searchUsers(filterParams?: UserSearchParams, userList?: Array<any>) {

    return new Promise((resolve, reject) => { resolve([]); });
  }

  clearSearchParams() {
  
    this.lastSearchParams = null;
  }
}