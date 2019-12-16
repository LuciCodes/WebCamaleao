import { Component, OnInit, Input } from '@angular/core';
import { CandidateHabilities } from 'src/app/models/candidateHabilities';
import { CandidateHabilityCollection } from 'src/app/models/candidateHabilityCollection';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Skill } from 'src/app/models/skill';
import { AppConstants } from 'src/app/etc/appConstants';
import { CandidateService } from 'src/app/services/candidate.service';
import { MatSnackBar } from '@angular/material';
import { CandidateDetails } from 'src/app/models/candidateDetails';

@Component({
  selector: 'app-candidate-panel-habilities-edit',
  templateUrl: './candidate-panel-habilities-edit.component.html',
  styleUrls: ['./candidate-panel-habilities-edit.component.css']
})
export class CandidatePanelHabilitiesEditComponent implements OnInit {

  flagSavingData = false;

  private categoryCounts: any = {};
  
  private _candidateHabilities: CandidateHabilities;

  private _habilitiesByCategory: any = null;

  get habilitiesByCategory(): any {

    if (this._habilitiesByCategory == null) {

      this._habilitiesByCategory = AppConstants.getSKillsByCategoriesObject(this._candidateHabilities.list);
    }

    this.countCategories();

    return this._habilitiesByCategory;
  }

  get categories(): Array<string> {

    return AppConstants.basicSkillsCategories;
  }

  @Input()
  set candidateHabilities(value: CandidateHabilities) {

    this._candidateHabilities = value;

    //this.habilityCollection = CandidateHabilityCollection.fromString(value.list, this._candidateHabilities.list);

    this.initForm(this._candidateHabilities);
    
    if (!this.candidateService.editingCandidate) {

      this.candidateService.editingCandidate = new CandidateDetails();
    }

    this.candidateService.editingCandidate.candidateHabilities = this._candidateHabilities;
  }

  //habilityCollection: CandidateHabilityCollection;

  frmCandidateHabilities: FormGroup;

  public get selectedSkills(): Array<Skill> {

    let result = [];

    for (let i = 0; i < AppConstants.basicSkillsCategories.length; i++) {

      let cat = AppConstants.basicSkillsCategories[i];

      if (this._habilitiesByCategory[cat]) {

        result.splice(-1, 0, this._habilitiesByCategory[cat].filter(c => c.uiSelected));
      }
    }

    return result;
  }

  constructor(private fb: FormBuilder,
              private candidateService: CandidateService,
              private snackBar: MatSnackBar) {  }

  initForm(obj?: any) {
    
    if (!obj) { obj = {}; }

    let list = obj.list ? obj.list.split(', ') : [];

    console.log('habilities list:', list);

    this.frmCandidateHabilities = this.fb.group({
      list: [list]
    });
    
    this.countCategories();
  }

  toggleSkill(skill: Skill) {

    skill.uiSelected = !skill.uiSelected;

    let keys = this.selectedSkills.join(', ');

    this.candidateService.editingCandidate.candidateHabilities.list = keys;

    console.log('this.candidateService.editingCandidate.candidateHabilities.list> ', keys);

    this.countCategories();

    //this.saveOnTime();
  }
  
  countCategories() {

    if (!this.categoryCounts) { this.categoryCounts = {}; }

    if (!this._habilitiesByCategory) { return; }

    for (let i = 0; i < AppConstants.basicSkillsCategories.length; i++) {

      let cat = AppConstants.basicSkillsCategories[i];

      if (this._habilitiesByCategory[cat]) {

        this.categoryCounts[cat] = this._habilitiesByCategory[cat].filter(c => c.uiSelected).length;
      }
    }
  }

  async ngOnInit() {

  }

  async save() {

    if (!this.flagSavingData) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      console.log('Salvando list> ', this.candidateService.editingCandidate.candidateHabilities.list);

      let result = await this.candidateService.saveCandidateHabilities(this.candidateService.editingCandidate.candidateHabilities);

      console.log('Salvadas habilidades:', result);

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');

      this.flagSavingData = false;
    }
  }
}