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
export class UserFirebaseService {

  user: User;
  userToken: firebase.auth.IdTokenResult;
  candidate: Candidate;
  candidateProfile: CandidateProfile;
  candidateHabilities: CandidateHabilities;
  candidateEducation: CandidateEducation;

  candidateExperiences: Array<Experience>;

  loading = false;

  user$: Observable<User | null>;

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

  constructor(private fireAuth: AngularFireAuth,
              private fireDb: AngularFirestore,
              private fbFuncs: AngularFireFunctions) {

    this.user$ = this.fireAuth.user;

    this.fireAuth.idTokenResult.subscribe(async (result: firebase.auth.IdTokenResult) => { 

      this.userToken = result;

      console.log('Got userToken>', result);

      if (result) console.log('User claim:', this.userToken.claims['userRole']);

    });

    this.user$.subscribe(async (user: User) => {

      console.log('Got user>', user);

      this.user = user;

      if (this.user) {

        //await this.loadUserCandidate();

      } else {

        this.candidate = null;
        this.candidateExperiences = null;
        this.candidateEducation = null;
        this.candidateHabilities = null;
        this.candidateProfile = null;
      }
    });
  }

  async loadUserCandidate() {
    
    if (this.user && !this.loading && !this.candidate) {

      console.log('loadUserCandidate()> loading...');

      this.loading = true;

      let candidateQuery = await this.fireDb.collection('candidates').ref.where('userId', "==", this.user.uid);

      let candidateResult = await candidateQuery.get();

      if (candidateResult.empty) {

        let newCandidateRef = await this.fireDb.collection('candidates').add({
          userId: this.user.uid,
          name: this.user.displayName
        });

        this.candidate = new Candidate({ userId: this.user.uid, id: newCandidateRef.id, name: this.user.displayName });

        console.log('Created new user candidate:', this.candidate);

      } else {

        this.candidate = (new Candidate({ id: candidateResult.docs[0], ...candidateResult.docs[0].data() }));

        this.candidate.id = candidateResult.docs[0].id;
        
        console.log('Loaded user candidate:', this.candidate);
      }
      
      this.loading = false;

    } else {
    
      console.log('loadUserCandidate()> already loading.');
    }
    
  }

  async loadUserCandidateProfile() {
  
    console.log('loadUserCandidateProfile()');

    if (this.user) {

      if (!this.candidate) {

        await this.loadUserCandidate();
      }

      let candidateQuery = await this.fireDb.collection('candidateProfiles').ref.where('userId', "==", this.user.uid);

      let candidateResult = await candidateQuery.get();

      if (candidateResult.empty) {

        let newCandidateProfileRef = await this.fireDb.collection('candidateProfiles').add({ 
          userId: this.user.uid,
          candidateId: this.candidate.id
        });

        this.candidateProfile = new CandidateProfile({
          userId: this.user.uid,
          candidateId: this.candidate.id,
          id: newCandidateProfileRef.id
        });

        console.log('Created new user candidateProfile:', this.candidateProfile);

      } else {

        this.candidateProfile = new CandidateProfile({ id: candidateResult.docs[0].id, ...candidateResult.docs[0].data() });
          
        console.log('Loaded user candidateProfile:', this.candidateProfile);
      }
    }
  }

  async loadUserCandidateHabilities() {
    
    if (this.user) {

      if (!this.candidate) {

        await this.loadUserCandidate();
      }

      let candidateQuery = await this.fireDb.collection('candidateHabilities').ref.where('userId', "==", this.user.uid);

      let candidateResult = await candidateQuery.get();

      if (candidateResult.empty) {

        let newCandidateHabilitiesRef = await this.fireDb.collection('candidateHabilities').add({ 
          userId: this.user.uid,
          candidateId: this.candidate.id
        });

        this.candidateHabilities = new CandidateHabilities({
          userId: this.user.uid,
          candidateId: this.candidate.id,
          id: newCandidateHabilitiesRef.id,
          list: ''
        });

        console.log('Created new user candidateHabilities:', this.candidateHabilities);

      } else {

        this.candidateHabilities = new CandidateHabilities({ id: candidateResult.docs[0].id, ...candidateResult.docs[0].data() });

        if (!this.candidateHabilities.list) {

          this.candidateHabilities.list = '';
        }

        console.log('Loaded user candidateHabilities:', this.candidateHabilities);
      }
    }
  }

  async loadUserCandidateEducation() {
    
    if (this.user) {

      if (!this.candidate) {

        await this.loadUserCandidate();
      }

      let candidateQuery = await this.fireDb.collection('candidateEducation').ref
                                                 .where('userId', "==", this.user.uid);

      let candidateResult = await candidateQuery.get();

      if (candidateResult.empty) {

        let newCandidateEducationRef = await this.fireDb.collection('candidateEducation').add({ 
          userId: this.user.uid,
          candidateId: this.candidate.id
        });

        this.candidateEducation = new CandidateEducation({
          userId: this.user.uid,
          candidateId: this.candidate.id,
          id: newCandidateEducationRef.id
        });

        console.log('Created new user candidateEducation:', this.candidateEducation);

      } else {

        this.candidateEducation = new CandidateEducation({ id: candidateResult.docs[0].data, ...candidateResult.docs[0].data() });
          
        this.candidateEducation.id = candidateResult.docs[0].id;
        
        console.log('Loaded user candidateEducation:', this.candidateEducation);
      }
    }
  }

  async loadUsercandidateExperiences() {
    
    if (this.user) {

      if (!this.candidate) {

        await this.loadUserCandidate();
      }

      let candidateQuery = await this.fireDb.collection('candidateExperiences').ref.where('userId', "==", this.user.uid);

      let candidateResult = await candidateQuery.get();

      if (candidateResult.empty) {

        this.candidateExperiences = [];

      } else {

        let experiences = [];

        for (let c = 0; c < candidateResult.docs.length; c++) {

          experiences.push(new Experience({ id: candidateResult.docs[c].id, ...candidateResult.docs[c].data()} ));
        }
        
        this.candidateExperiences = experiences;
        
        console.log('Loaded user candidateExperiences:', experiences);
      }
    }
  }

  async saveUserCandidate(candidate?: Candidate): Promise<any> {

    candidate.id = this.candidate.id;
    candidate.userId = this.user.uid;

    candidate.updated = firebase.firestore.Timestamp.fromDate(new Date());
    candidate.updatedUserId = this.user.uid;

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true };

    try 
    {
      await this.fireDb.collection('candidates')
                                      .doc(candidate.id)
                                      .set(candidate.toDocumentObject(), { merge: true });
                                        
      this.candidate = candidate;
    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }
  
  async saveUserCandidateProfile(candidateProfile?: CandidateProfile): Promise<any> {

    if (!this.candidate) { await this.loadUserCandidate(); }

    if (!this.candidateProfile) { await this.loadUserCandidateProfile(); }

    candidateProfile.id = this.candidateProfile.id;
    candidateProfile.userId = this.user.uid;
    candidateProfile.candidateId = this.candidate.id;

    candidateProfile.updated = firebase.firestore.Timestamp.fromDate(new Date());
    candidateProfile.updatedUserId = this.user.uid;

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true };

    if (candidateProfile.toDocumentObject){ candidateProfile = candidateProfile.toDocumentObject(); }

    try 
    {
      await this.fireDb.collection('candidateProfiles')
                                      .doc(candidateProfile.id)
                                      .set(candidateProfile, { merge: true });
                                        
      this.candidateProfile = candidateProfile;
    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }
  
  async saveUserCandidateHabilities(candidateHabilities?: CandidateHabilities): Promise<any> {

    if (!this.candidate) { await this.loadUserCandidate(); }

    if (!this.candidateHabilities) { await this.loadUserCandidateHabilities(); }

    candidateHabilities.id = this.candidateHabilities.id;
    candidateHabilities.userId = this.user.uid;
    candidateHabilities.candidateId = this.candidate.id;

    candidateHabilities.updated = firebase.firestore.Timestamp.fromDate(new Date());
    candidateHabilities.updatedUserId = this.user.uid;

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true };

    if (candidateHabilities.toDocumentObject) { candidateHabilities = candidateHabilities.toDocumentObject(); }
    
    try 
    {
      await this.fireDb.collection('candidateHabilities')
                                      .doc(candidateHabilities.id)
                                      .set(candidateHabilities, { merge: true });
                                        
      this.candidateHabilities = candidateHabilities;
    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }
  
  async saveUserCandidateEducation(candidateEducation?: CandidateEducation): Promise<any> {

    if (!this.candidate) { await this.loadUserCandidate(); }

    if (!this.candidateEducation) { await this.loadUserCandidateEducation(); }

    candidateEducation.id = this.candidateEducation.id;
    candidateEducation.userId = this.user.uid;
    candidateEducation.candidateId = this.candidate.id;

    candidateEducation.updated = firebase.firestore.Timestamp.fromDate(new Date());
    candidateEducation.updatedUserId = this.user.uid;

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true };

    if (candidateEducation.toDocumentObject) { candidateEducation = candidateEducation.toDocumentObject(); }
    
    try 
    {
      await this.fireDb.collection('candidateEducation')
                                      .doc(candidateEducation.id)
                                      .set(candidateEducation, { merge: true });
                                        
      this.candidateEducation = candidateEducation;
    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }
  
  async removeUsercandidateExperience(experience?: Experience): Promise<any> {

    let expQuery = await this.fireDb.collection('candidateExperiences').ref.where('candidateId', "==", this.candidate.id);

    let expResult = await expQuery.get();

    if (!expResult.empty) {

      let existingExp = expResult.docs.find(d => d.id == experience.id);

      if (existingExp) {

        await this.fireDb.collection('candidateExperiences').doc(existingExp.id).delete();
      }
    }
  }

  async saveUsercandidateExperience(experience?: Experience): Promise<any> {

    if (!this.candidate) { await this.loadUserCandidate(); }

    experience = new Experience(experience);

    experience.userId = this.user.uid;
    experience.candidateId = this.candidate.id;

    experience.updated = firebase.firestore.Timestamp.fromDate(new Date());
    experience.updatedUserId = this.user.uid;

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true };

    if (experience.toDocumentObject) { experience = experience.toDocumentObject(); }
    
    try 
    {
      let newExpRef = await this.fireDb.collection('candidateExperiences').add(experience);

      experience.id = newExpRef.id;

      this.candidateExperiences.push(experience);

    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }

  async searchUsers(filterParams?: UserSearchParams, userList?: Array<any>) {

    let results = [];

    let usersResult = await this.fireDb.collection('users').get().toPromise();

    for(let d = 0; d < usersResult.docs.length; d++) {

      results.push({ id: usersResult.docs[d].id, ...usersResult.docs[d].data() });
      
      results[d].id = usersResult.docs[d].id;
    }
    
    /*
    const searchUsers = this.fbFuncs.httpsCallable('searchUsers');

    console.log('Calling searchUsers...');

    let funcResult = await searchUsers(filterParams).toPromise();  
    
    console.log('Result:', funcResult);

    if (funcResult.success) {
      
      this.lastSearchResults = funcResult.result.users;
      this.lastSearchParams = filterParams;
    }

    */
    
    return results;

  }

}