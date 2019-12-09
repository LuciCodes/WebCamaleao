import { Component, OnInit, Input } from '@angular/core';
import { JobOffer } from 'src/app/models/jobOffer';

@Component({
  selector: 'app-job-offer-card',
  templateUrl: './job-offer-card.component.html',
  styleUrls: ['./job-offer-card.component.css']
})
export class JobOfferCardComponent implements OnInit {

  @Input()
  public jobOffer: JobOffer;

  constructor() { }

  ngOnInit() {
  }

  photoOf(offer: JobOffer) {

    let result = '/assets/img/default-avatar.png';

    //get the company logo if any
    
    return result;
  }
}
