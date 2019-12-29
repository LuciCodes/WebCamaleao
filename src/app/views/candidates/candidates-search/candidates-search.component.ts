import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';
import { WebApiService } from 'src/app/services/webApi.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { CandidateSearchParams } from 'src/app/models/candidateSearchParams';

@Component({
  selector: 'app-candidates-search',
  templateUrl: './candidates-search.component.html',
  styleUrls: ['./candidates-search.component.css']
})
export class CandidatesSearchComponent  {

  get cepMask() { return AppConstants.cepMask; }

  public flagLoadingData: boolean = false;

  candidates: Array<any>;

  frmSearch: FormGroup;

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

  initForm(obj: any) {

    this.frmSearch = this.fb.group({
      idCpf: [obj.idCpf],
      name: [obj.name],
      gender: [obj.gender],
      sex: [obj.sex],
      pcd: [obj.pcd],
      locationType: [obj.locationType],
      seachNearZip: [obj.seachNearZip],
      searchInStates: [obj.searchInStates],
      searchInCities: [obj.searchInCities],
      searchInCitiesOfState: [obj.searchInCitiesOfState],
      searchInProfessions: [obj.searchInProfessions]
    });
  }

  constructor(private candidateService: CandidateService,
              private fb: FormBuilder) {

    this.initForm({});
  }

  async ngOnInit(): Promise<any> {

    await this.candidateService.loadCandidates();

    this.initForm(this.candidateService.lastSearchParams || {});
    
    if (this.candidateService.lastSearchResults) {

      this.candidates = this.candidateService.lastSearchResults;
    }
  }
  
  search() {
    
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

  clearParams() {

    this.candidateService.clearSearchParams();
  }
}
