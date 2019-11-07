import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Candidate } from '../models/candidate';

@Injectable()
export class UserService {

  user: User;
  candidate: Candidate;

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

    this.user$.subscribe((user: User) => {

      this.user = user;

      this.loadUserCandidate();
    });
  }

  async loadUserCandidate() {
    
    if (this.user) {

      let candidateQuery = await this.fireDb.collection('candidates').ref.where('userId', "==", this.user.uid);

      let candidateResult = await candidateQuery.get();

      if (candidateResult.empty) {

        let newCandidateRef = await this.fireDb.collection('candidates').add({ userId: this.user.uid });

        this.candidate = new Candidate({ userId: this.user.uid, id: newCandidateRef.id });

        console.log('Created new candidate:', this.candidate);

      } else {

        this.candidate = (candidateResult.docs[0].data() as Candidate);
          
        this.candidate.id = candidateResult.docs[0].id;
      }
    }
  }
}