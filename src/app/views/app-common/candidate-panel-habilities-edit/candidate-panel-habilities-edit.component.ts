import { Component, OnInit, Input } from '@angular/core';
import { CandidateHabilities } from 'src/app/models/candidateHabilities';
import { CandidateHabilityCollection } from 'src/app/models/candidateHabilityCollection';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Skill } from 'src/app/models/skill';
import { AppConstants } from 'src/app/etc/appConstants';

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

    return this._habilitiesByCategory;
  }

  get categories(): Array<string> {

    return AppConstants.basicSkillsCategories;
  }

  @Input()
  set candidateHabilities(value: CandidateHabilities) {

    this._candidateHabilities = value;

    this.habilityCollection = CandidateHabilityCollection.fromString(value.list, this._candidateHabilities.list);

    console.log('hab col:', this.habilityCollection);

    this.initForm(this._candidateHabilities);
  }

  habilityCollection: CandidateHabilityCollection;

  frmCandidateHabilities: FormGroup;

  public get selectedSkills(): Array<Skill> {

    return this.habilityCollection.items.filter(s => s.uiSelected);
  }

  constructor(private fb: FormBuilder) {  }

  initForm(obj?: any) {
    
    if (!obj) { obj = {}; }

    let list = obj.list ? obj.list.split(', ') : [];

    console.log('habilities list:', list);

    this.frmCandidateHabilities = this.fb.group({
      list: [list]
    });
  }
  
  hasHability(category, hability) {

    let key = `{ category }: { hability }`;

    return this._candidateHabilities.list.includes(key);
  }

  toggleSkill(skill: Skill) {

    //let key = `{ skill.category }: { skill.name }`;

    skill.uiSelected = !skill.uiSelected;

    this.countCategories(true);

    //this.saveOnTime();
  }
  
  countCategories(force: boolean = false) {

    if (!this.categoryCounts || force) {

      this.categoryCounts = {};

      this.habilityCollection.categories.forEach(cat => {
  
        this.categoryCounts[cat] = this.selectedSkills.filter(s => s.category == cat).length || 0;
      });

      console.log('Counted', this.categoryCounts);
    }
  }

  async ngOnInit() {

  }

  async save() {

    if (!this.flagSavingData && this.frmCandidateHabilities.valid) {

      /*
      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let candidate: any = new Candidate(this.frmCandidate.value).toDocumentObject();

      console.log('Saving candidate:', candidate);

      let result = await this.userService.saveUserCandidate(candidate);

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');

      this.flagSavingData = false;
      */
    }
  }
}