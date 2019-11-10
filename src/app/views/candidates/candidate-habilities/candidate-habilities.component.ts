import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'app-candidate-habilities',
  templateUrl: './candidate-habilities.component.html',
  styleUrls: ['./candidate-habilities.component.css']
})
export class CandidateHabilitiesComponent implements OnInit {

  public frmCandidateHabilities: FormGroup;

  constructor(private fb: FormBuilder) {}

  public get skills(): Array<Skill> {

    return AppConstants.basicSkills;
  }

  public get skillsCategories(): Array<string> {

    return AppConstants.basicSkillsCategories;
  }

  selectedCategory: string = 'TI';

  public get currentSkills(): Array<Skill> {

    return AppConstants.basicSkills.filter(s => s.category == this.selectedCategory);
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

  ngOnInit() {

    this.frmCandidateHabilities = this.fb.group({
      mainSkills:  [''],
      otherSkills:  [''],
      specialties:  [''],
      timePerSkill:  ['']
    });
  }

  save(evtObj) {

  }
}
