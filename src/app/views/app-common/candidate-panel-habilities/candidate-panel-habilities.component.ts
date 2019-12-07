import { Component, OnInit, Input } from '@angular/core';
import { CandidateHabilities } from 'src/app/models/candidateHabilities';

@Component({
  selector: 'app-candidate-panel-habilities',
  templateUrl: './candidate-panel-habilities.component.html',
  styleUrls: ['./candidate-panel-habilities.component.css']
})
export class CandidatePanelHabilitiesComponent implements OnInit {

  @Input()
  candidateHabilities: CandidateHabilities
  
  @Input()
  showTitle: boolean = true;

  constructor() { }

  ngOnInit() {
  }
}