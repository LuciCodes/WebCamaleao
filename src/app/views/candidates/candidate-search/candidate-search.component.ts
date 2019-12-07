import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';
import { WebApiService } from 'src/app/services/webApi.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { CandidateSearchParams } from 'src/app/models/candidateSearchParams';

@Component({
  selector: 'app-candidate-search',
  templateUrl: './candidate-search.component.html',
  styleUrls: ['./candidate-search.component.css']
})
export class CandidateSearchComponent  {

  get cepMask() { return AppConstants.cepMask; }

  flagLoadingData: boolean = false;

  candidates: Array<any>;

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

  constructor(private webApi: WebApiService,
              private candidateService: CandidateService,
              private fb: FormBuilder) {}

  onSubmit() {
    
    this.flagLoadingData = true;
    
    window.setTimeout(() => {
  
      let params = new CandidateSearchParams(this.frmSearch.value);

      params.forceReload = true;

      this.candidateService.searchCandidates(params).then((candidateList) => {

        this.candidates = candidateList;

        this.flagLoadingData = false;
      });
      
    }, 420);
  }

}
