import { Component, OnInit } from '@angular/core';
import { WebApiService } from 'src/app/services/webApi.service';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css']
})
export class CompanyHomeComponent implements OnInit {

  flagLoadingCandidates: boolean = false;
  flagLoadingJobs: boolean = false;

  jobList: Array<any>;
  candidateList: Array<any>;

  constructor(private webApi: WebApiService) {}

  ngOnInit(): void {
    
    this.loadCandidates();
    
    this.loadJobs();
  }

  loadCandidates() {

    this.flagLoadingCandidates = true;
    
    this.webApi.getTopCandidates().then((candidates) => {

      this.candidateList = candidates;
  
      this.flagLoadingJobs = false;
    });
  }

  loadJobs() {
    
    this.flagLoadingJobs = true;

    this.webApi.getTopJobOffers().then((offers) => {

      this.jobList = offers;
  
      this.flagLoadingJobs = false;
    });
  }
}