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
export class UserService {

  user: User;
  candidate: Candidate;
  candidateProfile: CandidateProfile;
  candidateHabilities: CandidateHabilities;
  candidateEducation: CandidateEducation;

  candidateWorkExperiences: Array<WorkExperience> = [];

  user$: Observable<User | null>;

  userProfiles: Array<UserProfile> = [];

  get hasUser(): boolean { return this.user != null; }

  get userIsCandidate(): boolean {

    // padronizando type em branco como CANDIDATE também
    // no cadastro, salvar o user depois com a propriedade type
    return (this.hasUser && (
               this.userProfiles.length == 0
            || this.userProfiles.findIndex(p => p.name == 'CANDIDATE') != -1
            ));
  }
  
  get userIsCompany(): boolean {

    return (this.hasUser && (
               this.userProfiles.findIndex(p => p.name == 'COMPANY') != -1
            ));
  }

  get userIsAdmin(): boolean {

    return (this.hasUser && (
               this.userProfiles.findIndex(p => p.name == 'ADMIN') != -1
            ));
  }

  constructor(private fireAuth: AngularFireAuth,
              private fireDb: AngularFirestore) {

    this.user$ = this.fireAuth.user;

    this.user$.subscribe(async (user: User) => {

      this.user = user;

      await this.loadUserCandidate();

      await this.loadUserProfiles();
    });
  }

  async loadUserCandidate() {
    
    if (this.user) {

      let candidateQuery = await this.fireDb.collection('candidates').ref.where('userId', "==", this.user.uid);

      let candidateResult = await candidateQuery.get();

      if (candidateResult.empty) {

        let newCandidateRef = await this.fireDb.collection('candidates').add({ userId: this.user.uid });

        this.candidate = new Candidate({ userId: this.user.uid, id: newCandidateRef.id });

        console.log('Created new user candidate:', this.candidate);

      } else {

        this.candidate = (new Candidate(candidateResult.docs[0].data()));

        this.candidate.id = candidateResult.docs[0].id;
        
        console.log('Loaded user candidate:', this.candidate);
      }
    }
  }
  
  async loadUserProfiles() {
    
    if (this.user) {

      let profilesQuery = await this.fireDb.collection('userProfiles').ref.where('userId', "==", this.user.uid);

      let profilesResult = await profilesQuery.get();

      this.userProfiles = [];

      if (!profilesResult.empty) {

        for (let p = 0; p < profilesResult.docs.length; p++) {

          this.userProfiles.push(new UserProfile({
            id: profilesResult.docs[p].id,
            ... profilesResult.docs[p].data()
          }));
        }

        console.log('Loaded user profiles:', this.userProfiles);
      }
    }
  }

  async loadUserCandidateProfile() {
    
    if (this.user) {

      if (!this.candidate) {

        await this.loadUserCandidate();
      }

      let candidateQuery = await this.fireDb.collection('candidateProfiles').ref.where('candidateId', "==", this.candidate.id);

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

        this.candidateProfile = (candidateResult.docs[0].data() as CandidateProfile);
          
        this.candidateProfile.id = candidateResult.docs[0].id;
        
        console.log('Loaded user candidateProfile:', this.candidateProfile);
      }
    }
  }

  async loadUserCandidateHabilities() {
    
    if (this.user) {

      if (!this.candidate) {

        await this.loadUserCandidate();
      }

      let candidateQuery = await this.fireDb.collection('candidateHabilities').ref.where('candidateId', "==", this.candidate.id);

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

        this.candidateHabilities = (candidateResult.docs[0].data() as CandidateHabilities);
          
        this.candidateHabilities.id = candidateResult.docs[0].id;
        
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

      let candidateQuery = await this.fireDb.collection('candidateEducation').ref.where('candidateId', "==", this.candidate.id);

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

        this.candidateEducation = (candidateResult.docs[0].data() as CandidateEducation);
          
        this.candidateEducation.id = candidateResult.docs[0].id;
        
        console.log('Loaded user candidateEducation:', this.candidateEducation);
      }
    }
  }

  async loadUsercandidateWorkExperiences() {
    
    if (this.user) {

      if (!this.candidate) {

        await this.loadUserCandidate();
      }

      let candidateQuery = await this.fireDb.collection('candidateWorkExperiences').ref.where('candidateId', "==", this.candidate.id);

      let candidateResult = await candidateQuery.get();

      if (candidateResult.empty) {

        this.candidateWorkExperiences = [];

      } else {

        let experiences = [];

        for (let c = 0; c < candidateResult.docs.length; c++) {

          experiences.push(new WorkExperience( { 
            id: candidateResult.docs[c].id ,
            ...candidateResult.docs[c].data()
          } ));
        }
        
        this.candidateWorkExperiences = experiences;
        
        console.log('Loaded user candidateWorkExperiences:', experiences);
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
                                      .set(candidate, { merge: true });
                                        
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
  
  async removeUsercandidateWorkExperience(workExperience?: WorkExperience): Promise<any> {

    let expQuery = await this.fireDb.collection('candidateWorkExperiences').ref.where('candidateId', "==", this.candidate.id);

    let expResult = await expQuery.get();

    if (!expResult.empty) {

      let existingExp = expResult.docs.find(d => d.id == workExperience.id);

      if (existingExp) {

        await this.fireDb.collection('candidateWorkExperiences').doc(existingExp.id).delete();
      }
    }
  }

  async saveUsercandidateWorkExperience(workExperience?: WorkExperience): Promise<any> {

    if (!this.candidate) { await this.loadUserCandidate(); }

    workExperience = new WorkExperience(workExperience);

    workExperience.userId = this.user.uid;
    workExperience.candidateId = this.candidate.id;

    workExperience.updated = firebase.firestore.Timestamp.fromDate(new Date());
    workExperience.updatedUserId = this.user.uid;

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true };

    try 
    {
      let obj = workExperience.toDocumentObject();

      let newExpRef = await this.fireDb.collection('candidateWorkExperiences').add(obj);

      workExperience.id = newExpRef.id;

      this.candidateWorkExperiences.push(workExperience);

    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }
}