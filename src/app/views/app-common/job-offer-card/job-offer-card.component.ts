import { Component, OnInit, Input } from '@angular/core';
import { JobOffer } from 'src/app/models/jobOffer';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-job-offer-card',
  templateUrl: './job-offer-card.component.html',
  styleUrls: ['./job-offer-card.component.css']
})
export class JobOfferCardComponent implements OnInit {

  @Input()
  public jobOffer: JobOffer;
  
  @Input()
  public company: Company;

  constructor(private companyService: CompanyService, public imgService: ImageService) { }

  async ngOnInit() {

  }

  photoOf(offer: JobOffer) {

    let result = '/assets/img/default-avatar.png';

    //get the company logo if any
    
    return result;
  }
}
