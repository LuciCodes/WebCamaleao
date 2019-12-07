
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { WebApiMockService } from './webApi.mock.service';
import { WebApiFirebaseService } from './webApi.firebase.service';

@Injectable()
export class WebApiService {

  mockAll: boolean = true;
  firebaseAll: boolean = false;

  mockFunctions: Array<string> = [];
  fbFunctions: Array<string> = [];

  constructor(private webMock: WebApiMockService,
              private webFirebase: WebApiFirebaseService){}

  userForMock(name: string): boolean {

    return (this.mockFunctions.findIndex(f => f == name) != -1);
  }

  userForFirebase(name: string): boolean {

    return (this.fbFunctions.findIndex(f => f == name) != -1);
  }

  async searchCandidates() : Promise<Array<any>> {

    if (this.mockAll || this.userForMock('searchCandidates')) {

      return this.webMock.searchCandidates();
    }
    
    if (this.firebaseAll || this.userForFirebase('searchCandidates')) {

      return this.webFirebase.searchCandidates();
    }

    return [];
  }

  async searchJobOffers() : Promise<Array<any>> {

    if (this.mockAll || this.userForMock('searchJobOffers')) {

      return this.webMock.searchJobOffers();
    }
    
    if (this.firebaseAll || this.userForFirebase('searchJobOffers')) {

      return this.webFirebase.searchJobOffers();
    }

    return [];
  }
  
  async getCandidates() : Promise<Array<any>> {

    if (this.mockAll || this.userForMock('getCandidates')) {

      return this.webMock.getCandidates();
    }
    
    if (this.firebaseAll || this.userForFirebase('getCandidates')) {

      return this.webFirebase.getCandidates();
    }

    return [];
  }

  async getTopJobOffers() : Promise<Array<any>> {

    if (this.mockAll || this.userForMock('getTopJobOffers')) {

      return this.webMock.getTopJobOffers();
    }
    
    if (this.firebaseAll || this.userForFirebase('getTopJobOffers')) {

      return this.webFirebase.getTopJobOffers();
    }

    return [];
  }

  
  async getTopCandidates() : Promise<Array<any>> {

    if (this.mockAll || this.userForMock('getTopCandidates')) {

      return this.webMock.getTopCandidates();
    }
    
    if (this.firebaseAll || this.userForFirebase('getTopCandidates')) {

      return this.webFirebase.getTopCandidates();
    }

    return [];
  }
  
}