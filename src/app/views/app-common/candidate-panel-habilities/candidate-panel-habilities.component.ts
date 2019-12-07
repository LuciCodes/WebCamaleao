import { Component, OnInit, Input } from '@angular/core';
import { CandidateHabilities } from 'src/app/models/candidateHabilities';
import { CandidateHabilityCollection } from 'src/app/models/candidateHabilityCollection';

@Component({
  selector: 'app-candidate-panel-habilities',
  templateUrl: './candidate-panel-habilities.component.html',
  styleUrls: ['./candidate-panel-habilities.component.css']
})
export class CandidatePanelHabilitiesComponent implements OnInit {

  private _candidateHabilities: CandidateHabilities;

  @Input()
  set candidateHabilities(value: CandidateHabilities) {

    this._candidateHabilities = value;
    this.habilityCollection = CandidateHabilityCollection.fromString(value.list);
  }
    
  get categories(): Array<string> {
    
    return this.habilityCollection ? this.habilityCollection.categories : [];
  }

  @Input()
  showTitle: boolean = true;
  
  @Input()
  mode: string = 'default';

  habilityCollection: CandidateHabilityCollection;

  constructor() { }

  ngOnInit() {
  }
}