import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AppConstants } from '../../../services/appConstants';
import { WebApiService } from 'src/app/services/webApi.service';

@Component({
  selector: 'app-buscar-vagas',
  templateUrl: './buscar-vagas.component.html',
  styleUrls: ['./buscar-vagas.component.css']
})
export class BuscarVagasComponent {

  flagLoadingData: boolean = false;

  jobList: Array<any>;

  get states(): Array<any> {

    return AppConstants.brazilianStates;
  }

  get professions(): Array<any> {

    return AppConstants.professions;
  }

  get citiesOfSelectedState(): Array<any> {
    
    let state = this.frmBuscarVagas.controls['searchInCitiesOfState'].value;

    if (state) {

      return this.states.find(s => s.abrev == state).cities;

    } else { return []; }
  }

  frmBuscarVagas = this.fb.group({
    seachTerm: null,
    locationType: 'any',
    seachNearZip: null,
    searchInStates: null,
    searchInCities: null,
    searchInCitiesOfState: null,
    searchInProfessions: null
    /*,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
    */
  });

  constructor(private webApi: WebApiService, private fb: FormBuilder) {}

  onSubmit() {
    
    this.flagLoadingData = true;
    
    window.setTimeout(() => {
  
      this.webApi.searchJobOffers().then((jobs) => {

        this.jobList = jobs;

        this.flagLoadingData = false;
      });
      
    }, 1420);
  }

}
