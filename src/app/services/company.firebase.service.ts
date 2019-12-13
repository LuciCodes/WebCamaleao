import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Company } from '../models/company';
import * as firebase from 'firebase';

@Injectable()
export class CompanyFirebaseService {

  private _companyCache: Array<Company> = [];
  private _workExperienceCache: Array<any> = [];

  get companies(): Array<Company> {

    return this._companyCache;
  }

  constructor(private fireAuth: AngularFireAuth,
              private fireDb: AngularFirestore) {

  }

  async getCompany(companyId: string): Promise<Company> {
    
    let result: Company = this._companyCache.find(e => e.id == companyId);

    if (!result) {

      let companyQuery = await this.fireDb.collection('companies').doc(companyId);

      let companyResult = await companyQuery.get().toPromise();
  
      if (companyResult) {
  
        result = new Company(companyResult.data());
      }
    }

    return result;
  }
  
  async loadCompanies(reload: boolean = false): Promise<Array<Company>> {
    
    if (!this._companyCache || reload) {
      
      let companyQuery = await this.fireDb.collection('companies').ref.where('signupState', '==', 'COMPLETED').orderBy('id');

      let companyResult = await companyQuery.get();

      if (!companyResult.empty) {

        let results = [];

        for(let d = 0; d < companyResult.docs.length; d++) {

          results.push(new Company(companyResult.docs[d].data()));
          
          results[d].id = companyResult.docs[d].id;
        }

        this._companyCache = results;

      } else {

        this._companyCache = [];
      }
    }

    return this._companyCache;
  }
  
  async saveCompany(company?: Company): Promise<any> {

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true };

    try 
    {
      await this.fireDb.collection('companies')
                                      .doc(company.id)  //TODO: fazer esses IDs serem uids ou inser/update separados
                                      .set(company, { merge: true });
                                 

    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }
}