import { Injectable } from '@angular/core';
import { Company } from '../models/company';

@Injectable()
export class ImageService {

  public photoOf(person?: any) {

    if (person && person.photoUrl && person.photoUrl != '') {

      return person.photoUrl;
    }

    return '/assets/img/default-avatar.png';
  }
  
  public logoOf(company?: Company) {

    console.log('Logo Of', company);

    if (company && company.logoUrl && company.logoUrl != '') {

      return company.logoUrl;
    }

    return '/assets/img/default-company-logo.png';
  }
}