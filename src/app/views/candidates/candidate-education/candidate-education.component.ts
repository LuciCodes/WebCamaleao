import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';
import { Skill } from 'src/app/models/skill';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { CandidateEducation } from 'src/app/models/candidateEducation';
import { Course } from 'src/app/models/course';
import { Certification } from 'src/app/models/certification';

@Component({
  selector: 'app-candidate-education',
  templateUrl: './candidate-education.component.html',
  styleUrls: ['./candidate-education.component.css']
})
export class CandidateEducationComponent implements OnInit {

  private flagLoadingData = false;
  private flagSavingData = false;

  public frmCandidateEducation: FormGroup;

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

    return (this.frmCandidateEducation.controls.newCertificationName.valid);
  }

  public get courses(): Array<Course> {

    return this.userService.candidateEducation.courses;

    /*
    return [
      {
        name: 'Ensino Médio',
        institution: 'Iluminati',
        level: 'ENSINO_MEDIO',
        startDate: 'Jan/2001',
        endDate: 'Jan/2004',
        duration: '3 anos',
        state: 'SP'
      },
      {
        name: 'Superior em Ciência da Computação',
        description: 'Ciência da Computação',
        institution: 'UNIVAP',
        level: 'SUPERIOR_COMPLETO',
        startDate: 'Jan/2004',
        endDate: 'Jan/2009',
        duration: '5 anos',
        state: 'SP',
        area: 'TECNOLOGIA_REDE_DE_COMPUTADORES'
      }
    ]
    */
  }

  public get cursosDescription(): string {

    if (this.courses.length > 0) {

      let plur = this.courses.length == 1 ? '' : 's';

      return `${ this.courses.length } curso${ plur } cadastrado${ plur }`;

    } else {

      return 'nenhum cadastrado';
    }
  }

  public get years(): Array<string> {

    return [
      '1970',
      '1971',
      '1972',
      '1973',
      '1974',
      '1975',
      '1976',
      '1977',
      '1978',
      '1979',
      '1980',
      '1981',
      '1982',
      '1983',
      '1984',
      '1985',
      '1986',
      '1987',
      '1988',
      '1989',
      '1990',
      '1991',
      '1992',
      '1993',
      '1994',
      '1995',
      '1996',
      '1997',
      '1998',
      '1999',
      '2000',
      '2001',
      '2002',
      '2003',
      '2004',
      '2005',
      '2006',
      '2007',
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020'
    ]
  }

  constructor(private fb: FormBuilder,
    private userService: UserService,
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
  }

  async ngOnInit() {

    this.flagLoadingData = true;

    if (!this.userService.candidateEducation) {

      await this.userService.loadUserCandidateEducation();
    }

    this.initForm(this.userService.candidateEducation);

    this.flagLoadingData = false;
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

      this.userService.candidateEducation.courses.push(newCourse);

      await this.save();
    }
  }

  async removeCourse(course: Course) {

    if (!this.flagSavingData) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let courseIdx = this.userService.candidateEducation.courses.findIndex(c => c.id == course.id);

      this.userService.candidateEducation.courses.splice(courseIdx, 1);

      await this.save();
    }
  }

  async save() {

    let lvl = this.frmCandidateEducation.value.level;

    let edu = new CandidateEducation(this.userService.candidateEducation)

    edu.level = lvl;

    let obj = edu.toDocumentObject();

    let msg = this.snackBar.open('Salvando dados...', obj);

    let result = await this.userService.saveUserCandidateEducation(obj);

    msg.dismiss();

    msg = this.snackBar.open(result.msg, 'OK');

    this.flagSavingData = false;
  }
}
