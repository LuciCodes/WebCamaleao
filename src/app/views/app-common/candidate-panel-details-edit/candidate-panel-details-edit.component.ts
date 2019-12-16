import { Component, OnInit, Input } from '@angular/core';
import { CandidateDetails } from 'src/app/models/candidateDetails';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-candidate-panel-details-edit',
  templateUrl: './candidate-panel-details-edit.component.html',
  styleUrls: ['./candidate-panel-details-edit.component.css']
})
export class CandidatePanelDetailsEditComponent implements OnInit {

  @Input()
  set candidateDetails(value: CandidateDetails) {

    this.candidateService.editingCandidate = value;
  }
  
  get candidateDetails(): CandidateDetails {

    return this.candidateService.editingCandidate;
  }
  
  @Input()
  showTitle: boolean = true;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
  }
}
