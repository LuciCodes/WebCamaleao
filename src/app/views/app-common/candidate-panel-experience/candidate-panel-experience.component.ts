import { Component, OnInit, Input } from '@angular/core';
import { WorkExperience } from 'src/app/models/workExperience';

@Component({
  selector: 'app-candidate-panel-experience',
  templateUrl: './candidate-panel-experience.component.html',
  styleUrls: ['./candidate-panel-experience.component.css']
})
export class CandidatePanelExperienceComponent implements OnInit {

  @Input()
  candidateExperience: Array<WorkExperience>;
  
  @Input()
  showTitle: boolean = true;

  constructor() { }

  ngOnInit() {
  }
}