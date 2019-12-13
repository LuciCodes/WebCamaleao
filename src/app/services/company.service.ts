import { Injectable } from '@angular/core';

import { Company } from '../models/company';

import { CompanyMockService } from './company.mock.service';
import { CompanyFirebaseService } from './company.firebase.service';
import { CompanySearchParams } from '../models/companySearchParams';

@Injectable()
export class CompanyService {

  mockAll: boolean = true;
  firebaseAll: boolean = true;

  mockFunctions: Array<string> = [];
  fbFunctions: Array<string> = ['loadCompanies', 'searchCompanies'];

  private _companies: Array<Company> = [];

  get companies(): Array<Company> {

    return this._companies;
  }

  userForMock(name: string): boolean {

    return (this.mockFunctions.findIndex(f => f == name) != -1);
  }

  userForFirebase(name: string): boolean {

    return (this.fbFunctions.findIndex(f => f == name) != -1);
  }

  constructor(private companyMock: CompanyMockService,
              private companyFirebase: CompanyFirebaseService) {

  }

  async getCompany(id: string) : Promise<Company> {

    let company: Company;

    if (this.mockAll || this.userForMock('getCompany')) {

      company = await this.companyMock.getCompany(id);

    }
    
    if (this.firebaseAll || this.userForFirebase('getCompany')) {
      
      company = await this.companyFirebase.getCompany(id);

    }

    return company;
  }
  
  async loadCompanies(forceReload: boolean = false) : Promise<Array<any>> {

    if (this.mockAll || this.userForMock('loadCompanies')) {

      this._companies = await this.companyMock.loadCompanies(forceReload);

      return this._companies;
    }
    
    if (this.firebaseAll || this.userForFirebase('loadCompanies')) {
      
      this._companies = await this.companyFirebase.loadCompanies(forceReload);

      return this._companies;
    }

    this._companies = [];
    
    return this._companies;
  }

  async saveCompany(company?: Company): Promise<any> {
    
    if (this.mockAll || this.userForMock('saveCompany')) {

      await this.companyMock.saveCompany(company);

      return this._companies;
    }
    
    if (this.firebaseAll || this.userForFirebase('saveCompany')) {
      
      this.companyFirebase.saveCompany(company);

      return this._companies;
    }
    
    return this._companies;
  }

  async searchCompanies(filterParams?: CompanySearchParams) : Promise<Array<any>> {

    let filters = {};

    if (filterParams.forceReload) { this._companies = null; }

    await this.loadCompanies(filterParams.forceReload);

    let filteredSearch = [];

    console.log('searchCompanies> ', filterParams);

    for (let c = 0; c < this._companies.length; c++) {

      let cand = this._companies[c];

      let include = true;

      /*
      if (filterParams.idCpf) {

        if (filterParams.idCpf.length <= 11) {

          // cpf
          include = (cand.cpf == filterParams.idCpf);

        } else {

          //id
          include = (cand.id == filterParams.idCpf);
        }
      }
      */
      

      if (include) {

        filteredSearch.push(cand);

        console.log('searchCompanies> added', cand);
      }
    }

    return filteredSearch;
  }
}