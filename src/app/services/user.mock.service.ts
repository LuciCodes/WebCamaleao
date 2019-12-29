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
import { AppUser } from '../models/appUser';
import { OperationResult } from '../models/operationResult';

@Injectable()
export class UserMockService {

  user: AppUser;
  
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

    return this.user.fbToken.claims['userRole'] || AppConstants.userRoles.candidate;
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

  async getUser(userId: string): Promise<AppUser> {
    
    return new AppUser();
  }

  async saveUser(user?: AppUser): Promise<OperationResult> {

    return new OperationResult(true, null, new AppUser());
  }

  async saveUserRoleName(uid: string, roleName: string): Promise<OperationResult> {

    return new OperationResult();
  }
  
  async saveUserRoleNameClaim(uid: string, roleName: string) : Promise<OperationResult> {

    return new OperationResult();
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