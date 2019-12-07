import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/models/candidate';
import { CandidateProfile } from 'src/app/models/candidateProfile';

@Component({
  selector: 'app-candidate-panel-basic-info',
  templateUrl: './candidate-panel-basic-info.component.html',
  styleUrls: ['./candidate-panel-basic-info.component.css']
})
export class CandidatePanelBasicInfoComponent implements OnInit {

  @Input()
  candidate: Candidate
  
  @Input()
  candidateProfile: CandidateProfile
  
  @Input()
  showTitle: boolean = true;

  constructor() { }

  ngOnInit() {
  }
}
