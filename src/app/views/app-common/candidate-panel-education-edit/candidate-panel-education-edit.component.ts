import { Component, OnInit, Input } from '@angular/core';
import { CandidateEducation } from 'src/app/models/candidateEducation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';
import { Course } from 'src/app/models/course';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { Certification } from 'src/app/models/certification';
import { CandidateService } from 'src/app/services/candidate.service';
import { CandidateDetails } from 'src/app/models/candidateDetails';

@Component({
  selector: 'app-candidate-panel-education-edit',
  templateUrl: './candidate-panel-education-edit.component.html',
  styleUrls: ['./candidate-panel-education-edit.component.css']
})
export class CandidatePanelEducationEditComponent implements OnInit {

  @Input()
  set candidateEducation(value: CandidateEducation) {

    if (!this.candidateService.editingCandidate) {

      this.candidateService.editingCandidate = new CandidateDetails();
    }

    this.candidateService.editingCandidate.candidateEducation = value;

    this.initForm(this.candidateService.editingCandidate.candidateEducation);
  }
  
  get candidateEducation(): CandidateEducation {

    return this.candidateService.editingCandidate.candidateEducation;
  }
  
  public flagSavingData = false;

  frmCandidateEducation: FormGroup;
  frmCandidateCertification: FormGroup;

  public flagLoadingData = false;

  public get educationalLevels(): Array<any> {

    return AppConstants.educationalLevels;
  }
  
  public get courseLevels(): Array<any> {

    return AppConstants.courseLevels;
  }

  public get businessAreas(): Array<any> {

    return AppConstants.businessAreas;
  }
  
  public get states(): Array<any> {

    return AppConstants.brazilianStates;
  }
  
  public get newCourseFormValid(): boolean {

    return ( this.frmCandidateEducation
          && this.frmCandidateEducation.valid
           );
  }
  
  public get newCertificationFormValid(): boolean {

    return ( this.frmCandidateCertification
          && this.frmCandidateCertification.valid
           );
  }

  public get courses(): Array<Course> {

    return this.candidateEducation ? this.candidateEducation.courses : [];
  }
  
  public get certifications(): Array<Certification> {

    return this.candidateEducation ? this.candidateEducation.certifications : [];
  }

  public get coursesDescription(): string {

    if (this.courses.length > 0) {

      let plur = this.courses.length == 1 ? '' : 's';

      return `${ this.courses.length } curso${ plur } cadastrado${ plur }`;

    } else {

      return 'nenhum cadastrado';
    }
  }

  public get years(): Array<string> {

    return AppConstants.years;
  }

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private candidateService: CandidateService,
    private snackBar: MatSnackBar
  ) {

    this.initForm();
  }

  initForm(edu: CandidateEducation = new CandidateEducation()) {

    this.frmCandidateEducation = this.fb.group({

      level: [ edu.level || 'ENSINO_FUNDAMENTAL_COMPLETO', Validators.required],
      newCourseName: ['', Validators.required],
      newCourseInstitution: [''],
      newCourseLevel: ['', Validators.required],
      newCourseStartDate: [''],
      newCourseEndDate: [''],
      newCourseDuration: [''],
      newCourseState: [''],
      newCourseArea: ['']
    });
    
    this.frmCandidateCertification = this.fb.group({

      newCertificationName: ['', Validators.required],
      newCertificationInstitution: [''],
      newCertificationYear: ['2019'],
      newCertificationDescription: [''],
    });
  }

  async ngOnInit() {

  }

  async addCourse() {

    if (this.frmCandidateEducation.valid && !this.flagSavingData) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let courseObj = this.frmCandidateEducation.value;

      let newCourse = new Course({
        name: courseObj.newCourseName,
        institution: courseObj.newCourseInstitution,
        level: courseObj.newCourseLevel,
        startDate: courseObj.newCourseStartDate,
        endDate: courseObj.newCourseEndDate,
        duration: courseObj.newCourseDuration,
        state: courseObj.newCourseState,
        area: courseObj.newCourseArea
      });

      this.candidateEducation.courses.push(newCourse);

      await this.save();
    }
  }

  async removeCourse(course: Course) {

    if (!this.flagSavingData) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let courseIdx = this.candidateEducation.courses.findIndex(c => c.id == course.id);

      if (courseIdx > -1) {

        this.candidateEducation.courses.splice(courseIdx, 1);
      }

      await this.save();
    }
  }

  async addCertification() {

    if (this.frmCandidateCertification.valid && !this.flagSavingData) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let certObj = this.frmCandidateCertification.value;

      let newCertification = new Certification({
        name: certObj.newCertificationName,
        institution: certObj.newCertificationInstitution,
        year: certObj.newCertificationYear,
        description: certObj.newCertificationDescription
      });

      this.candidateEducation.certifications.push(newCertification);

      await this.save();
    }
  }

  async removeCertification(certification: Certification) {

    if (!this.flagSavingData) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let certIdx = this.candidateEducation.certifications.findIndex(c => c.id == certification.id);

      if (certIdx > -1) {

        this.candidateEducation.courses.splice(certIdx, 1);
      }

      await this.save();
    }
  }

  async save() {

    this.candidateEducation.level = this.frmCandidateEducation.controls.level.value;

    let edu = new CandidateEducation(this.candidateEducation);

    edu.candidateId = this.candidateService.editingCandidate.candidate.id;
    edu.updatedUserId = this.userService.user.uid;

    let msg = this.snackBar.open('Salvando dados...');

    console.log('Saving edu:', edu);

    let result = await this.candidateService.saveCandidateEducation(edu);

    if (result.success) {

      this.candidateEducation = result.obj;

      console.log('Save result:', this.candidateEducation);
    }
    //result = await this.candidateService.saveCandidateEducation(obj);

    msg.dismiss();

    msg = this.snackBar.open(result.msg, 'OK');
   
    this.flagSavingData = false;
  }
}
