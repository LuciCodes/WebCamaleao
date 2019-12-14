import { Component, OnInit, Input } from '@angular/core';
import { JobOffer } from 'src/app/models/jobOffer';
import { Company } from 'src/app/models/company';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {

  @Input()
  public company: Company;

  constructor(public imgService: ImageService) { }

  async ngOnInit() {

  }
}
