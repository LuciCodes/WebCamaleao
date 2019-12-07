import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CandidateMockService {

  private _candidates: Array<Candidate>;

  get candidates(): Array<Candidate> {

    return this._candidates;
  }

  constructor(private http: HttpClient){}

  async getCandidate(candidateId: string) {
    
    if (!this._candidates) return null;

    return this._candidates.find(c => c.id == candidateId);
  }

  async loadCandidates(reload: boolean = false) : Promise<Array<Candidate>> {
    
    if (!this._candidates || reload) {

      let url = 'http://localhost:4200/assets/testData/candidates.json';

      await this.http.get(url).toPromise().then((okResponse) => {

        this._candidates = (okResponse as Array<any>);

      }, (errResponse) => {

        throw({ code:errResponse.status, msg: errResponse.statusText });
      });
    }

    return this._candidates;
  }
}