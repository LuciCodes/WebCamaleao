import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';
import { Skill } from 'src/app/models/skill';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { CandidateProfile } from 'src/app/models/candidateProfile';
import { CandidateHabilities } from 'src/app/models/candidateHabilities';

@Component({
  selector: 'app-candidate-habilities',
  templateUrl: './candidate-habilities.component.html',
  styleUrls: ['./candidate-habilities.component.css']
})
export class CandidateHabilitiesComponent implements OnInit {

  public frmCandidateHabilities: FormGroup;

  private flagLoadingData = false;
  private flagSavingData = false;

  private categoryCounts: any = {};

  private saveTimeout: any;

  public get skills(): Array<Skill> {

    return AppConstants.basicSkills;
  }

  public get skillsCategories(): Array<string> {

    this.countCategories();

    return AppConstants.basicSkillsCategories;
  }

  selectedCategory: string = 'Administrativas';

  public get currentSkills(): Array<Skill> {

    return AppConstants.basicSkills.filter(s => s.category == this.selectedCategory);
  }
  
  public get selectedSkills(): Array<Skill> {

    return AppConstants.basicSkills.filter(s => s.uiSelected);
  }
  
  public get skillList(): string {

    let result = '';

    let skills = AppConstants.basicSkills.filter(s => s.uiSelected);

    if (skills.length == 0) {

      result = '(Selecione abaixo)';

    } else {

      skills.forEach(s => result += ', ' + s);

      result = result.substr(2);
    }

    return result;
  }

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {

    this.initForm();
  }
  
  countCategories(force: boolean = false) {

    if (!this.categoryCounts || force) {

      this.categoryCounts = {};

      this.skillsCategories.forEach(cat => {
  
        this.categoryCounts[cat] = this.selectedSkills.filter(s => s.category == cat).length || 0;
      });

      console.log('Counted', this.categoryCounts);
    }
  }

  initForm(list?: string) {

    this.frmCandidateHabilities = this.fb.group({
      list: list
    });

    let obj = (list || '').split(',');

    if (obj && obj.length > 0) {

      obj.forEach(skillName => {
        
        let idx = AppConstants.basicSkills.findIndex(s => s.toString() == skillName.trim());

        if (idx >= 0) {

          AppConstants.basicSkills[idx].uiSelected = true;
        }
      });
    }

    this.countCategories(true);
  }

  toggleSkill(skill: Skill) {

    skill.uiSelected = !skill.uiSelected;

    let skills: any = AppConstants.basicSkills.filter(s => s.uiSelected);

    let list = '';

    skills.forEach(s => list += s.toString() + ', ');

    if (list.length >= 2) {

      list = list.substr(0, list.length - 2);
    }

    this.userService.candidateHabilities.list = list;

    this.countCategories(true);

    this.saveOnTime();
  }

  async ngOnInit() {

    this.flagLoadingData = true;

    if (!this.userService.candidateHabilities) {

      await this.userService.loadUserCandidateHabilities();
    }

    this.initForm(this.userService.candidateHabilities.list);

    this.flagLoadingData = false;
  }

  saveOnTime() {

    if (!this.saveTimeout && !this.flagSavingData) {

      this.saveTimeout = window.setTimeout(() => {

        this.save();

        this.saveTimeout = null;

      }, 3000);
    }
  }

  async save() {

    if (!this.flagSavingData && this.frmCandidateHabilities.valid) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let habilities = new CandidateHabilities(this.userService.candidateHabilities);

      let result = await this.userService.saveUserCandidateHabilities(habilities.toDocumentObject());

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');

      this.flagSavingData = false;
    }
  }
}
