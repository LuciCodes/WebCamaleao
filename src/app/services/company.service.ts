import { Injectable } from '@angular/core';

import { Company } from '../models/company';

import { CompanyMockService } from './company.mock.service';
import { CompanyFirebaseService } from './company.firebase.service';
import { CompanySearchParams } from '../models/companySearchParams';

@Injectable()
export class CompanyService {

  mockAll: boolean = false;
  firebaseAll: boolean = true;

  mockFunctions: Array<string> = [];
  fbFunctions: Array<string> = ['loadCompanies', 'searchCompanies'];

  lastSearchParams?: CompanySearchParams;
  lastSearchResults?: Array<Company>;

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
    
    let result = null;

    if (this.mockAll || this.userForMock('saveCompany')) {

      result = await this.companyMock.saveCompany(company);
    }
    
    if (this.firebaseAll || this.userForFirebase('saveCompany')) {
      
      result = await this.companyFirebase.saveCompany(company);
    }
    
    if (this.lastSearchResults) {
      // updates this cache

      let idx = this.lastSearchResults.findIndex(j => j.id == company.id);

      if (idx > -1) {

        this.lastSearchResults[idx] = company;
      }
    }

    return result;
  }

  async searchCompanies(filterParams?: CompanySearchParams, companyList?: Array<Company>) : Promise<Array<any>> {

    let filters = {};

    if (filterParams.forceReload) { this._companies = null; }

    await this.loadCompanies(filterParams.forceReload);

    let filteredSearch = [];

    console.log('searchCompanies> ', filterParams);

    if (filterParams.name) { filterParams.name = filterParams.name.toLowerCase(); }

    for (let c = 0; c < this._companies.length; c++) {

      let company = this._companies[c];

      let include = true;

      if (filterParams.name) {

        include = (company.name.toLowerCase().includes(filterParams.name));
      }

      if (include) {

        filteredSearch.push(company);
      }
    }

    this.lastSearchResults = filteredSearch;
    this.lastSearchParams = filterParams;

    return this.lastSearchResults;
  }
  
  clearSearchParams() {

    this.lastSearchParams = null;
  }
}