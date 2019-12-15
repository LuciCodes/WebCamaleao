import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';

import { Candidate } from 'src/app/models/candidate';
import { CandidateDetails } from 'src/app/models/candidateDetails';
import { CandidateService } from 'src/app/services/candidate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidates-edit',
  templateUrl: './candidates-edit.component.html',
  styleUrls: ['./candidates-edit.component.css']
})
export class CandidatesEditComponent implements OnInit {

  @Input()
  candidateDetails: CandidateDetails = new CandidateDetails();
  
  public frmCandidate: FormGroup;
  public frmCandidateProfile: FormGroup;
  public frmCandidateHabilities: FormGroup;
  public frmcandidateWorkExperiences: FormGroup;

  private flagLoadingData = false;
  private flagSavingData = false;

  get ptBrDateMask() { return AppConstants.ptBrDateMask; }
  get cpfMask() { return AppConstants.cpfMask; }
  get phoneMask() { return AppConstants.phoneMask; }

  get states(): Array<any> {

    return AppConstants.brazilianStates;
  }
  
  get isValid(): boolean {
    return this.frmCandidate && this.frmCandidate.valid;
  }

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private candidateService: CandidateService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {  }

  initForm(obj?: any) {

    if (!obj) { obj = {}; }

    if (!obj.candidate) { obj.candidate = {}; }
    if (!obj.candidateProfile) { obj.candidateProfile = {}; }

    this.frmCandidate = this.fb.group({
      biName: [obj.candidate.name],
      biBirth: [obj.candidate.birth],
      biDocRg: [obj.candidate.docRg],
      biSignupState: ['COMPLETED'],
      biAddrCity: [obj.candidate.addrCity],
      biAddrState: [obj.candidate.addrState],
      biAddrDistrict: [obj.candidate.addrDistrict],
      biIsSocialName: [obj.candidate.isSocialName],
      pfGender: [obj.candidateProfile.gender],
      pgSex: [obj.candidateProfile.sex],
      pfEthnicity: [obj.candidateProfile.ethnicity],
      pfPne: [obj.candidateProfile.pne],
      pfPneNote: [obj.candidateProfile.pneNote],
      habilities: [obj.candidateHabilities],
      weCompanyName: [obj.companyName],
      weRoleName: [obj.roleName],
      weDescription: [obj.description],
      weStartDate: [obj.startDate],
      weEndDate: [obj.endDate],
      weIsCurrent: [false],
      edLevel: [ obj.level],
      newCourseName: [''],
      newCourseInstitution: [''],
      newCourseLevel: [''],
      newCourseStartDate: [''],
      newCourseEndDate: [''],
      newCourseDuration: [''],
      newCourseState: [''],
      newCourseArea: [''],
      newCertificationName: [''],
      newCertificationInstitution: [''],
      newCertificationYear: [''],
      newCertificationDescription: [''],
    });
  }
  
  async ngOnInit() {

    this.flagLoadingData = true;

    this.route.paramMap.subscribe(async(params) => {

      let id = params.get('id');

      console.log(`getCandidateDetails(${ id })`);

      this.candidateDetails = await this.candidateService.getCandidateDetails(id);

      this.initForm(this.candidateDetails);

      this.flagLoadingData = false;
      
    });
  }

  async save() {

    if (!this.flagSavingData && this.frmCandidate.valid) {

      this.flagSavingData = true;

      let msg = this.snackBar.open('Salvando dados...');

      console.log('Saving candidate:', this.candidateDetails);

      let result = await this.candidateService.saveCandidate(this.candidateDetails);

      console.log('Saving result:', result.obj);

      msg.dismiss();

      msg = this.snackBar.open(result.msg, 'OK');

      this.flagSavingData = false;
    }
  }
}
