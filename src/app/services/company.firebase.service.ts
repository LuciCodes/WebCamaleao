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
  private _experienceCache: Array<any> = [];

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
  
        result = new Company({ id: companyResult.id, ...companyResult.data() });
      }
    }

    return result;
  }
  
  async loadCompanies(reload: boolean = false): Promise<Array<Company>> {
    
    if (!this._companyCache || reload) {
      
      let companyResult = await this.fireDb.collection('companies').get().toPromise();

      let results = [];

      for(let d = 0; d < companyResult.docs.length; d++) {

        results.push(new Company({ id: companyResult.docs[d].id, ...companyResult.docs[d].data() }));
        
        results[d].id = companyResult.docs[d].id;
      }

      this._companyCache = results;
    }

    return this._companyCache;
  }
  
  async saveCompany(company?: Company): Promise<any> {

    let saveResult = { msg: 'Dados salvados com sucesso!', success: true, obj: null };

    try 
    {
      if (company.id == 'new') {

        delete company['id'];

        let newObjRef = await this.fireDb.collection('companies').add(company);

        company.id = newObjRef.id;

      } else {

        await this.fireDb.collection('companies')
                                      .doc(company.id)
                                      .set(company, { merge: true });
      }

      saveResult.obj = company;
    }
    catch(err) {

      saveResult.msg = 'Erro salvando dados... ' + (err || '');
      saveResult.success = false;
    }

    return saveResult;
  }
}