import { Component, OnInit, Input } from '@angular/core';
import { CandidateEducation } from 'src/app/models/candidateEducation';

@Component({
  selector: 'app-candidate-panel-education',
  templateUrl: './candidate-panel-education.component.html',
  styleUrls: ['./candidate-panel-education.component.css']
})
export class CandidatePanelEducationComponent implements OnInit {

  @Input()
  candidateEducation: CandidateEducation
  
  @Input()
  showTitle: boolean = true;
  
  @Input()
  mode: string = 'default';

  constructor() { }

  ngOnInit() {
  }
}