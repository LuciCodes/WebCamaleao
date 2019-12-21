import { Component, OnInit } from '@angular/core';
import { WebApiService } from 'src/app/services/webApi.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-candidate',
  templateUrl: './home-candidate.component.html',
  styleUrls: ['./home-candidate.component.css']
})
export class HomeCandidateComponent implements OnInit {

  flagLoadingCandidates: boolean = false;
  flagLoadingJobs: boolean = false;

  jobList: Array<any> = [];
  messageList: Array<any> = [];

  constructor(private webApi: WebApiService, private userService: UserService) {}

  get user(): any {

    return this.userService.user || {};
  }

  ngOnInit(): void {
    
    //this.loadCandidates();
    
    this.loadJobs();
  }

  loadCandidates() {

    /*
    this.flagLoadingCandidates = true;
    
    this.webApi.getTopCandidates().then((candidates) => {

      this.candidateList = candidates;
  
      this.flagLoadingJobs = false;
    });
    */
  }

  loadJobs() {

    /*
    this.flagLoadingJobs = true;

    this.webApi.getTopJobOffers().then((offers) => {

      this.jobList = offers;
  
      this.flagLoadingJobs = false;
    });
    */
  }
}
