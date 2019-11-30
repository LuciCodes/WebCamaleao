import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Candidate } from '../models/candidate';
import * as firebase from 'firebase';
import { CandidateProfile } from '../models/candidateProfile';

@Injectable()
export class UserService {

  user: User;
  candidate: Candidate;
  candidateProfile: CandidateProfile;

  user$: Observable<User | null>;

  get hasUser(): boolean { return this.user != null; }

  get userIsCandidate(): boolean {

    // padronizando type em branco como CANDIDATE também
    // no cadastro, salvar o user depois com a propriedade type
    return (this.hasUser && (!this.user['type'] || this.user['type'] == 'CANDIDATE'));
  }

  constructor(private fireAuth: AngularFireAuth,
              private fireDb: AngularFirestore) {

    this.user$ = this.fireAuth.user;

    this.user$.subscribe(async (user: User) => {

      this.user = user;

      await this.loadUserCandidate();
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

        this.candidate = (candidateResult.docs[0].data() as Candidate);
          
        this.candidate.id = candidateResult.docs[0].id;
        
        console.log('Loaded user candidate:', this.candidate);
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

    if (!this.candidate) {

      await this.loadUserCandidate();
    }

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
}