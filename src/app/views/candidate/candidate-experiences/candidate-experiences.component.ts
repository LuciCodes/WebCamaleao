import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkExperience } from 'src/app/models/workExperience';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { CandidateEducation } from 'src/app/models/candidateEducation';

@Component({
  selector: 'app-candidate-WorkExperiences',
  templateUrl: './candidate-experiences.component.html',
  styleUrls: ['./candidate-experiences.component.css']
})
export class CandidateExperiencesComponent implements OnInit {

  private flagLoadingData = false;
  private flagSavingData = false;

  public frmcandidateWorkExperiences: FormGroup;

  get isValid(): boolean {

    return this.frmcandidateWorkExperiences && this.frmcandidateWorkExperiences.valid;
  }

  public get experiences(): Array<any> {

     if (this.userService && this.userService.candidateWorkExperiences) {

        return this.userService.candidateWorkExperiences || [];

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

    this.frmcandidateWorkExperiences = this.fb.group({

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

    if (!this.userService.candidateWorkExperiences) {

      await this.userService.loadUsercandidateWorkExperiences();
    }

    this.initForm();

    this.flagLoadingData = false;
  }

  async addWorkExperience() {

    if (this.isValid && !this.flagSavingData) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let WorkExperienceObj = this.frmcandidateWorkExperiences.value;

      let exp = new WorkExperience(WorkExperienceObj);

      let result = await this.userService.saveUsercandidateWorkExperience(exp.toDocumentObject());

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');
      
      this.flagSavingData = false;
    }
  }

  async removeWorkExperience(workExperience: WorkExperience) {

    if (!this.flagSavingData) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let workExperienceIdx = this.userService.candidateWorkExperiences.findIndex(c => c.id == workExperience.id);

      if (workExperienceIdx >= 0) {

        let exp = this.userService.candidateWorkExperiences[workExperienceIdx];

        await this.userService.removeUsercandidateWorkExperience(exp);
  
        this.userService.candidateWorkExperiences.splice(workExperienceIdx, 1);
  
        this.flagSavingData = false;
          
        msg.dismiss();
  
        msg = this.snackBar.open('Experiência removida.', 'OK');

      } else {
        
        msg.dismiss();
  
      }
    }
  }
}
