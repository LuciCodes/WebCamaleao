import { Component, OnInit, Input } from '@angular/core';
import { CandidateDetails } from 'src/app/models/candidateDetails';

@Component({
  selector: 'app-candidate-panel-details-edit',
  templateUrl: './candidate-panel-details-edit.component.html',
  styleUrls: ['./candidate-panel-details-edit.component.css']
})
export class CandidatePanelDetailsEditComponent implements OnInit {

  @Input()
  candidateDetails: CandidateDetails
  
  @Input()
  showTitle: boolean = true;

  constructor() { }

  ngOnInit() {
  }
}
