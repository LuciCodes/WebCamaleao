import { Component, OnInit, Input } from '@angular/core';
import { JobOffer } from 'src/app/models/jobOffer';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {

  @Input()
  public company: Company;

  constructor() { }

  async ngOnInit() {

  }

  photoOf(company: Company) {

    let result = '/assets/img/default-avatar.png';

    //get the company logo if any
    
    return company.logoUrl;
  }
}
