import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';

@Component({
  selector: 'app-candidate-education',
  templateUrl: './candidate-education.component.html',
  styleUrls: ['./candidate-education.component.css']
})
export class CandidateEducationComponent implements OnInit {

  public frmCandidateEducation: FormGroup;

  public get educationalLevels(): Array<any> {

    return AppConstants.educationalLevels;
  }
  
  public get businessAreas(): Array<any> {

    return AppConstants.businessAreas;
  }
  
  public get states(): Array<any> {

    return AppConstants.brazilianStates;
  }
  
  public get newCourseFormValid(): boolean {

    return ( this.frmCandidateEducation.controls.newCourseName.valid
          && this.frmCandidateEducation.controls.newCourseLevel.valid
           );
  }
  
  public get newCertificationFormValid(): boolean {

    return (this.frmCandidateEducation.controls.newCertificationName.valid);
  }

  public get courses(): Array<any> {

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
  }

  public get certifications(): Array<any> {

    return [
      {
        name: 'AWS Certified Cloud Practicioner',
        institution: 'Amazon',
        year: '2019',
        description: 'Cloud development basics'
      }
    ]
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.frmCandidateEducation = this.fb.group({

      level: ['', Validators.required],
      newCourseName: ['', Validators.required],
      newCourseInstitution: [''],
      newCourseLevel: ['', Validators.required],
      newCourseStartDate: [''],
      newCourseEndDate: [''],
      newCourseDuration: [''],
      newCourseState: [''],
      newCourseArea: [''],

      newCertificationName: ['', Validators.required],
      newCertificationInstitution: [''],
      newCertificationYear: ['2019'],
      newCertificationDescription: [''],
    });
  }

  addCourse() {

  }

  addCertification() {

  }

  save(evtObj) {

  }
}
