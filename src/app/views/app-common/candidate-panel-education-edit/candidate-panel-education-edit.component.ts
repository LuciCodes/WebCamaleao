import { Component, OnInit, Input } from '@angular/core';
import { CandidateEducation } from 'src/app/models/candidateEducation';

@Component({
  selector: 'app-candidate-panel-education-edit',
  templateUrl: './candidate-panel-education-edit.component.html',
  styleUrls: ['./candidate-panel-education-edit.component.css']
})
export class CandidatePanelEducationEditComponent implements OnInit {

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