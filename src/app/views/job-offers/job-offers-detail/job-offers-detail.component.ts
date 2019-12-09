import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobOffer } from 'src/app/models/jobOffer';
import { JobOfferService } from 'src/app/services/job-offer.service';
import {Location} from '@angular/common';
import { AppConstants } from 'src/app/etc/appConstants';

@Component({
  selector: 'app-job-offers-detail',
  templateUrl: './job-offers-detail.component.html',
  styleUrls: ['./job-offers-detail.component.css']
})
export class JobOffersDetailComponent implements OnInit {

  flagLoadingData = false;

  editingObj: JobOffer;

  frmJobOffer: any;

  get cepMask() { return AppConstants.cepMask; }

  get states(): Array<any> {

    return AppConstants.brazilianStates;
  }

  get professions(): Array<any> {

    return AppConstants.professions;
  }

  /*
  get citiesOfSelectedState(): Array<any> {
    
    let state = this.frmSearch.controls['searchInCitiesOfState'].value;

    if (state) {

      return this.states.find(s => s.abrev == state).cities;

    } else { return []; }
  }
  */

  constructor(private fb: FormBuilder,
              public location: Location,
              private jobOfferService: JobOfferService,
              private route: ActivatedRoute) {

    this.initForm();
  }

  initForm(obj?: any) {
    
    if (!obj) { obj = {}; }

    this.frmJobOffer = this.fb.group({
      companyId: null,
      title: [obj.title, Validators.required],
      description: [obj.description, Validators.required],
      level: [obj.level, Validators.required],
      areas: [null, Validators.required]
    });
  }

  ngOnInit(): void {

    this.flagLoadingData = true;

    this.route.paramMap.subscribe(async(params) => {

      let id = params.get('id');

      if (!id || id == '' || id == 'nova') {

        this.editingObj = new JobOffer();

      } else {

        this.editingObj = await this.jobOfferService.getJobOffer(id);
      }

      this.initForm(this.editingObj);

      this.flagLoadingData = false;
      
    });
  }

  onSubmit() {
    alert('Thanks!');
  }
  
}
