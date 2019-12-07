
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable()
export class WebApiMockService {


  constructor(private http: HttpClient){}

  async searchJobOffers() : Promise<Array<any>> {

    let url = 'http://localhost:4200/assets/testData/jobOffers.json';

    let response;
    
    await this.http.get(url).toPromise().then((okResponse) => {

      response = okResponse;

    }, (errResponse) => {

      throw({ code:errResponse.status, msg: errResponse.statusText });
    });

    return response;
  }
  
  async searchCandidates(searchParams?: any) : Promise<Array<any>> {

    let url = 'http://localhost:4200/assets/testData/candidates.json';

    let response;

    await this.http.get(url).toPromise().then((okResponse) => {

      response = okResponse;

    }, (errResponse) => {

      throw({ code:errResponse.status, msg: errResponse.statusText });
    });

    return response;
  }

  async getCandidates() : Promise<Array<any>> {

    let url = 'http://localhost:4200/assets/testData/candidates.json';

    let response;
    
    await this.http.get(url).toPromise().then((okResponse) => {

      response = okResponse;

    }, (errResponse) => {

      throw({ code:errResponse.status, msg: errResponse.statusText });
    });

    return response;
  }

  async getTopJobOffers() : Promise<Array<any>> {

    let allOffers = await this.searchJobOffers();

    let result = [];

    if (allOffers.length > 0) { result.push(allOffers[0]); }
    if (allOffers.length > 1) { result.push(allOffers[1]); }
    if (allOffers.length > 2) { result.push(allOffers[2]); }
    
    return result;
  }

  
  async getTopCandidates() : Promise<Array<any>> {

    let candidades = await this.getCandidates();

    let result = [];

    if (candidades.length > 0) { result.push(candidades[0]); }
    if (candidades.length > 1) { result.push(candidades[1]); }
    if (candidades.length > 2) { result.push(candidades[2]); }
    
    return result;
  }

  
}