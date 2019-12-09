import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AppConstants } from '../../../etc/appConstants';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { JobOfferSearchParams } from 'src/app/models/jobOfferSearchParams';

@Component({
  selector: 'app-job-offers-search',
  templateUrl: './job-offers-search.component.html',
  styleUrls: ['./job-offers-search.component.css']
})
export class JobOffersSearchComponent {

  get cepMask() { return AppConstants.cepMask; }

  flagLoadingData: boolean = false;

  jobOffers: Array<any>;

  get states(): Array<any> {

    return AppConstants.brazilianStates;
  }

  get professions(): Array<any> {

    return AppConstants.professions;
  }

  get citiesOfSelectedState(): Array<any> {
    
    let state = this.frmSearch.controls['searchInCitiesOfState'].value;

    if (state) {

      return this.states.find(s => s.abrev == state).cities;

    } else { return []; }
  }

  frmSearch = this.fb.group({
    idCpf: '',
    name: '',
    gender: '',
    sex: '',
    pcd: '',
    locationType: '',
    seachNearZip: null,
    searchInStates: null,
    searchInCities: null,
    searchInCitiesOfState: null,
    searchInProfessions: null
  });

  constructor(private jobOfferService: JobOfferService,
              private fb: FormBuilder) {}

  onSubmit() {
    
    this.flagLoadingData = true;
    
    window.setTimeout(() => {
  
      let params = new JobOfferSearchParams(this.frmSearch.value);

      params.forceReload = true;

      this.jobOfferService.searchJobOffers(params).then((list) => {

        this.jobOffers = list;

        this.flagLoadingData = false;
      });
      
    }, 420);
  }

}
