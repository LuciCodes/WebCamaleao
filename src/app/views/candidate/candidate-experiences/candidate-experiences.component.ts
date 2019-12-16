import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from 'src/app/models/experience';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { CandidateEducation } from 'src/app/models/candidateEducation';

@Component({
  selector: 'app-candidate-Experiences',
  templateUrl: './candidate-experiences.component.html',
  styleUrls: ['./candidate-experiences.component.css']
})
export class CandidateExperiencesComponent implements OnInit {

  private flagLoadingData = false;
  private flagSavingData = false;

  public frmcandidateExperiences: FormGroup;

  get isValid(): boolean {

    return this.frmcandidateExperiences && this.frmcandidateExperiences.valid;
  }

  public get experiences(): Array<any> {

     if (this.userService && this.userService.candidateExperiences) {

        return this.userService.candidateExperiences || [];

    } else {

      return [];
    };
  }

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {

    this.initForm();
  }

  initForm() {

    this.frmcandidateExperiences = this.fb.group({

      companyName: [ 'Teste', Validators.required],
      roleName: ['Admin', Validators.required],
      description: ['Fiz coisas'],
      startDate: ['01/01/2001'],
      endDate: ['01/02/2002'],
      isCurrent: [false]
    });
  }

  async ngOnInit() {

    this.flagLoadingData = true;

    if (!this.userService.candidateExperiences) {

      await this.userService.loadUsercandidateExperiences();
    }

    this.initForm();

    this.flagLoadingData = false;
  }

  async addExperience() {

    if (this.isValid && !this.flagSavingData) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let ExperienceObj = this.frmcandidateExperiences.value;

      let exp = new Experience(ExperienceObj);

      let result = await this.userService.saveUsercandidateExperience(exp.toDocumentObject());

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');
      
      this.flagSavingData = false;
    }
  }

  async removeExperience(experience: Experience) {

    if (!this.flagSavingData) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let experienceIdx = this.userService.candidateExperiences.findIndex(c => c.id == experience.id);

      if (experienceIdx >= 0) {

        let exp = this.userService.candidateExperiences[experienceIdx];

        await this.userService.removeUsercandidateExperience(exp);
  
        this.userService.candidateExperiences.splice(experienceIdx, 1);
  
        this.flagSavingData = false;
          
        msg.dismiss();
  
        msg = this.snackBar.open('Experiência removida.', 'OK');

      } else {
        
        msg.dismiss();
  
      }
    }
  }
}
