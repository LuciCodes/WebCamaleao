import { Component, OnInit, Input } from '@angular/core';
import { CandidateDetails } from 'src/app/models/candidateDetails';

@Component({
  selector: 'app-candidate-panel-details',
  templateUrl: './candidate-panel-details.component.html',
  styleUrls: ['./candidate-panel-details.component.css']
})
export class CandidatePanelDetailsComponent implements OnInit {

  @Input()
  candidateDetails: CandidateDetails
  
  @Input()
  showTitle: boolean = true;

  constructor() { }

  ngOnInit() {
  }
}
