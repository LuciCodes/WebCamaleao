import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Company } from '../models/company';

@Injectable()
export class CompanyMockService {

  private _companyCache: Array<Company> = [];
  
  private _workExperienceCache: Array<any> = [];
  
  get companies(): Array<Company> {

    return this._companyCache;
  }

  constructor(private http: HttpClient){}

  async getCompany(companyId: string): Promise<Company> {
    
    let result: Company = this._companyCache.find(e => e.id == companyId);

    if (!result) {

      let url = `http://localhost:4200/assets/testData/company-${ companyId }.json`;

      await this.http.get(url).toPromise().then(async (okResponse) => {

        let cand = new Company(okResponse);

        this._companyCache.push(cand);

        result = cand;

      }, (errResponse) => {});
    }

    return result;
  }

  async loadCompanies(reload: boolean = false) : Promise<Array<Company>> {
    
    if (!this._companyCache || reload) {

      let url = 'http://localhost:4200/assets/testData/companies.json';

      await this.http.get(url).toPromise().then((okResponse) => {

        this._companyCache = (okResponse as Array<any>);

      }, (errResponse) => {

        throw({ code:errResponse.status, msg: errResponse.statusText });
      });
    }

    return this._companyCache;
  }
  
  async saveCompany(company?: Company): Promise<Company> {

    /*
    company.id = this.candidate.id;
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
    */

    return company;
  }
}