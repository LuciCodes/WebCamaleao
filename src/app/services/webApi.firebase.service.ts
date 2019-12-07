
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable()
export class WebApiFirebaseService {


  constructor(private http: HttpClient){}

  async searchJobOffers() : Promise<Array<any>> {

    return [];
  }
  
  async searchCandidates(searchParams?: any) : Promise<Array<any>> {

    return [];
  }

  async getCandidates() : Promise<Array<any>> {

    return [];
  }

  async getTopJobOffers() : Promise<Array<any>> {

    return [];
  }
  
  async getTopCandidates() : Promise<Array<any>> {

    return [];
  }

  
}