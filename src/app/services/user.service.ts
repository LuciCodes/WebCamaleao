import { Injectable } from '@angular/core';
import { User } from 'firebase';

import { Candidate } from '../models/candidate';
import * as firebase from 'firebase';
import { CandidateProfile } from '../models/candidateProfile';
import { CandidateHabilities } from '../models/candidateHabilities';
import { CandidateEducation } from '../models/candidateEducation';
import { Experience } from '../models/experience';
import { UserSearchParams } from '../models/userSearchParams';
import { UserMockService } from './user.mock.service';
import { UserFirebaseService } from './user.firebase.service';
import { AppUser } from '../models/appUser';
import { OperationResult } from '../models/operationResult';
import { CandidateDetails } from '../models/candidateDetails';

@Injectable()
export class UserService {

  get user(): AppUser {

    if (this.mockAll) { return this.userMock.user; }
  
    return this.userFirebase.user;
  }
  
  set user(value: AppUser) {

    if (this.mockAll) { this.userMock.user = value; return; }
  
    this.userFirebase.user = value;
  }

  get userToken(): firebase.auth.IdTokenResult {
  
    return this.userFirebase.user.fbToken;
  }

  get candidate(): Candidate {
  
    if (this.mockAll) { return this.userMock.candidate; }
  
    return this.userFirebase.candidate;
  }

  get candidateProfile(): CandidateProfile {
  
    if (this.mockAll) { return this.userMock.candidateProfile; }
  
    return this.userFirebase.candidateProfile;
  }

  get candidateHabilities(): CandidateHabilities {
  
    if (this.mockAll) { return this.userMock.candidateHabilities; }
  
    return this.userFirebase.candidateHabilities;
  }

  get candidateEducation(): CandidateEducation {
  
    if (this.mockAll) { return this.userMock.candidateEducation; }
  
    return this.userFirebase.candidateEducation;
  }

  get candidateExperiences(): Array<Experience> {
  
    if (this.mockAll) { return this.userMock.candidateExperiences; }
  
    return this.userFirebase.candidateExperiences;
  }

  get loading(): boolean {
  
    if (this.mockAll) { return this.userMock.loading; }
  
    return this.userFirebase.loading;
  }

  get searchPage(): number {

    if (this.mockAll) { return this.userMock.searchPage; }
  
    return this.userFirebase.searchPage;
  }
  
  set searchPage(value: number) {

    if (this.mockAll) { this.userMock.searchPage = value; return; }
  
    this.userFirebase.searchPage = value;
  }

  get searchPageSize(): number {

    if (this.mockAll) { return this.userMock.searchPageSize; }
  
    return this.userFirebase.searchPageSize;
  }
  
  set searchPageSize(value: number) {

    if (this.mockAll) { this.userMock.searchPageSize = value; return; }
  
    this.userFirebase.searchPageSize = value;
  }

  users: Array<AppUser>;
  
  lastSearchParams?: UserSearchParams;
  lastSearchResults?: Array<AppUser>;

  mockAll: boolean = false;
  firebaseAll: boolean = true;

  mockFunctions: Array<string> = [];
  fbFunctions: Array<string> = [];

  get hasUser(): boolean { return this.user != null; }

  userForMock(name: string): boolean {

    return (this.mockFunctions.findIndex(f => f == name) != -1);
  }

  userForFirebase(name: string): boolean {

    return (this.fbFunctions.findIndex(f => f == name) != -1);
  }

  get userRole(): string {

    if (this.mockAll) { return this.userMock.userRole; }
  
    return this.userFirebase.userRole;
  }

  get userIsCandidate(): boolean {

    if (this.mockAll) { return this.userMock.userIsCandidate; }
  
    return this.userFirebase.userIsCandidate;
  }
  
  get userIsCompanyStaff(): boolean {

    if (this.mockAll) { return this.userMock.userIsCompanyStaff; }
  
    return this.userFirebase.userIsCompanyStaff;
  }

  get userIsAdmin(): boolean {

    if (this.mockAll) { return this.userMock.userIsAdmin; }
  
    return this.userFirebase.userIsAdmin;
  }

  get userIsStaff(): boolean {

    if (this.mockAll) { return this.userMock.userIsStaff; }
  
    return this.userFirebase.userIsStaff;
  }

  get userIsCompanyAdmin(): boolean {

    if (this.mockAll) { return this.userMock.userIsCompanyAdmin; }
  
    return this.userFirebase.userIsCompanyAdmin;
  }

  constructor(private userMock: UserMockService,
              private userFirebase: UserFirebaseService) {

  }

  async loadUserCandidate() {
    
    if (this.mockAll || this.userForMock('loadUserCandidate')) {

      return this.userMock.loadUserCandidate();
    }
    
    if (this.firebaseAll || this.userForFirebase('loadUserCandidate')) {
      
      return this.userFirebase.loadUserCandidate();
    }

    return null;
  }

  async loadUserCandidateProfile() {
    
    if (this.mockAll || this.userForMock('loadUserCandidateProfile')) {

      return this.userMock.loadUserCandidateProfile();
    }
    
    if (this.firebaseAll || this.userForFirebase('loadUserCandidateProfile')) {
      
      return this.userFirebase.loadUserCandidateProfile();
    }

    return null;
  }

  async loadUserCandidateHabilities() {
    
    if (this.mockAll || this.userForMock('loadUserCandidateHabilities')) {

      return this.userMock.loadUserCandidateHabilities();
    }
    
    if (this.firebaseAll || this.userForFirebase('loadUserCandidateHabilities')) {
      
      return this.userFirebase.loadUserCandidateHabilities();
    }

    return null;
  }

  async loadUserCandidateEducation() {
    
    if (this.mockAll || this.userForMock('loadUserCandidateEducation')) {

      return this.userMock.loadUserCandidateEducation();
    }
    
    if (this.firebaseAll || this.userForFirebase('loadUserCandidateEducation')) {
      
      return this.userFirebase.loadUserCandidateEducation();
    }

    return null;
  }

  async loadUsercandidateExperiences() {
    
    if (this.mockAll || this.userForMock('loadUsercandidateExperiences')) {

      return this.userMock.loadUsercandidateExperiences();
    }
    
    if (this.firebaseAll || this.userForFirebase('loadUsercandidateExperiences')) {
      
      return this.userFirebase.loadUsercandidateExperiences();
    }

    return null;
  }

  async getUser(uid: string): Promise<AppUser> {
    
    if (this.mockAll || this.userForMock('getUser')) {

      return this.userMock.getUser(uid);
    }

    if (this.firebaseAll || this.userForFirebase('getUser')) {
      
      return this.userFirebase.getUser(uid);
    }

    return null;
  }

  async getUserCandidateDetails(): Promise<CandidateDetails> {
    
    if (this.mockAll || this.userForMock('getUserCandidateDetails')) {

      return this.userMock.getUserCandidateDetails();
    }

    if (this.firebaseAll || this.userForFirebase('getUserCandidateDetails')) {
      
      return this.userFirebase.getUserCandidateDetails();
    }

    return null;
  }

  async saveUser(user?: AppUser): Promise<OperationResult> {

    if (this.mockAll || this.userForMock('saveUser')) {

      return this.userMock.saveUser(user);
    }

    if (this.firebaseAll || this.userForFirebase('saveUser')) {
      
      return this.userFirebase.saveUser(user);
    }

    return null;
  }

  async saveUserRoleName(uid: string, roleName: string): Promise<OperationResult> {
  
    if (this.mockAll || this.userForMock('saveUserRoleName')) {

      return this.userMock.saveUserRoleName(uid, roleName);
    }

    if (this.firebaseAll || this.userForFirebase('saveUserRoleName')) {
      
      return this.userFirebase.saveUserRoleName(uid, roleName);
    }

    return null;
  }

  async saveUserRoleNameClaim(uid: string, roleName: string) : Promise<OperationResult> {
  
    if (this.mockAll || this.userForMock('saveUserRoleNameClaim')) {

      return this.userMock.saveUserRoleNameClaim(uid, roleName);
    }

    if (this.firebaseAll || this.userForFirebase('saveUserRoleNameClaim')) {
      
      return this.userFirebase.saveUserRoleNameClaim(uid, roleName);
    }

    return null;
  }

  async saveUserCandidate(candidate?: Candidate): Promise<any> {

    if (this.mockAll || this.userForMock('saveUserCandidate')) {

      return this.userMock.saveUserCandidate(candidate);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveUserCandidate')) {
      
      return this.userFirebase.saveUserCandidate(candidate);
    }

    return null;
  }
  
  async saveUserCandidateProfile(candidateProfile?: CandidateProfile): Promise<any> {

    if (this.mockAll || this.userForMock('saveUserCandidateProfile')) {

      return this.userMock.saveUserCandidateProfile(candidateProfile);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveUserCandidateProfile')) {
      
      return this.userFirebase.saveUserCandidateProfile(candidateProfile);
    }

    return null;
  }
  
  async saveUserCandidateHabilities(candidateHabilities?: CandidateHabilities): Promise<any> {

    if (this.mockAll || this.userForMock('saveUserCandidateHabilities')) {

      return this.userMock.saveUserCandidateHabilities(candidateHabilities);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveUserCandidateHabilities')) {
      
      return this.userFirebase.saveUserCandidateHabilities(candidateHabilities);
    }

    return null;
  }
  
  async saveUserCandidateEducation(candidateEducation?: CandidateEducation): Promise<any> {

    if (this.mockAll || this.userForMock('saveUserCandidateEducation')) {

      return this.userMock.saveUserCandidateEducation(candidateEducation);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveUserCandidateEducation')) {
      
      return this.userFirebase.saveUserCandidateEducation(candidateEducation);
    }

    return null;
  }
  
  async removeUsercandidateExperience(experience?: Experience): Promise<any> {

    if (this.mockAll || this.userForMock('removeUsercandidateExperience')) {

      return this.userMock.removeUsercandidateExperience(experience);
    }
    
    if (this.firebaseAll || this.userForFirebase('removeUsercandidateExperience')) {
      
      return this.userFirebase.removeUsercandidateExperience(experience);
    }

    return null;
  }

  async saveUsercandidateExperience(experience?: Experience): Promise<any> {

    if (this.mockAll || this.userForMock('saveUsercandidateExperience')) {

      return this.userMock.saveUsercandidateExperience(experience);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveUsercandidateExperience')) {
      
      return this.userFirebase.saveUsercandidateExperience(experience);
    }

    return null;
  }

  async searchUsers(filterParams?: UserSearchParams, userList?: Array<any>) {

    if (this.mockAll || this.userForMock('searchUsers')) {

      return this.userMock.searchUsers(filterParams, userList);
    }
    
    if (this.firebaseAll || this.userForFirebase('searchUsers')) {
      
      return this.userFirebase.searchUsers(filterParams, userList);
    }

    return null;

  }

  clearSearchParams() {
  
    this.lastSearchParams = null;
  }
}