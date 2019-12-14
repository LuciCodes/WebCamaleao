import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';
import { WebApiService } from 'src/app/services/webApi.service';
import { CompanySearchParams } from 'src/app/models/companySearchParams';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-companies-search',
  templateUrl: './companies-search.component.html',
  styleUrls: ['./companies-search.component.css']
})
export class CompaniesSearchComponent  {

  get cepMask() { return AppConstants.cepMask; }

  flagLoadingData: boolean = false;

  companies: Array<any>;

  get professions(): Array<any> {

    return AppConstants.professions;
  }

  frmSearch: FormGroup;

  constructor(private companyService: CompanyService,
              private fb: FormBuilder) {}

  async ngOnInit(): Promise<any> {

    await this.companyService.loadCompanies();

    this.initForm(this.companyService.lastSearchParams || {});
    
    if (this.companyService.lastSearchResults) {

      this.companies = this.companyService.lastSearchResults;
    }
  }
  
  initForm(obj: any) {

    this.frmSearch = this.fb.group({
      name: [obj.name]
    });
  }

  search() {
    
    this.flagLoadingData = true;
    
    window.setTimeout(() => {
  
      let params = new CompanySearchParams(this.frmSearch.value);

      params.forceReload = true;

      this.companyService.searchCompanies(params, this.companyService.companies).then((list) => {

        this.companies = list;

        this.flagLoadingData = false;
      });
      
    }, 420);
  }

  clearParams() {

    this.companyService.clearSearchParams();

    this.initForm({});
  }
}
