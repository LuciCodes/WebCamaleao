import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';
import { Skill } from 'src/app/models/skill';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { CandidateEducation } from 'src/app/models/candidateEducation';
import { Certification } from 'src/app/models/certification';

@Component({
  selector: 'app-candidate-certifications',
  templateUrl: './candidate-certifications.component.html',
  styleUrls: ['./candidate-certifications.component.css']
})
export class CandidateCertificationsComponent implements OnInit {

  private flagLoadingData = false;
  private flagSavingData = false;

  public frmCandidateCertification: FormGroup;

  public get educationalLevels(): Array<any> {

    return AppConstants.educationalLevels;
  }
  
  public get businessAreas(): Array<any> {

    return AppConstants.businessAreas;
  }
  
  public get states(): Array<any> {

    return AppConstants.brazilianStates;
  }
  
  public get newCertificationFormValid(): boolean {

    return (this.frmCandidateCertification.valid);
  }

  public get certifications(): Array<any> {

     if (this.userService.candidateEducation) {

        return this.userService.candidateEducation.certifications || [];

    } else {

      return [];
    };
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

  initForm() {

    this.frmCandidateCertification = this.fb.group({

      newCertificationName: ['', Validators.required],
      newCertificationInstitution: [''],
      newCertificationYear: ['2019'],
      newCertificationDescription: [''],
    });
  }
  
  async ngOnInit() {

    this.flagLoadingData = true;

    if (!this.userService.candidateEducation) {

      await this.userService.loadUserCandidateEducation();
    }

    this.initForm();

    this.flagLoadingData = false;
  }

  async addCertification() {

    if (this.frmCandidateCertification.valid && !this.flagSavingData) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let certObj = this.frmCandidateCertification.value;

      let newCert = new Certification({
        name: certObj.newCertificationName,
        institution: certObj.newCertificationInstitution,
        year: certObj.newCertificationYear,
        description: certObj.newCertificationDescription
      });

      this.userService.candidateEducation.certifications.push(newCert);

      await this.save();

      this.initForm();
    }
  }

  async removeCertification(cert: Certification) {

    if (!this.flagSavingData) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      let courseIdx = this.userService.candidateEducation.certifications.findIndex(c => c.id == cert.id);

      this.userService.candidateEducation.certifications.splice(courseIdx, 1);

      await this.save();
    }
  }

  async save() {

    let edu = new CandidateEducation(this.userService.candidateEducation)

    let obj = edu.toDocumentObject();

    let msg = this.snackBar.open('Salvando dados...', obj);

    let result = await this.userService.saveUserCandidateEducation(obj);

    msg.dismiss();

    msg = this.snackBar.open(result.msg, 'OK');

    this.flagSavingData = false;
  }
}
