import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/etc/appConstants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

  public frmCandidateProfile: FormGroup;

  get flagIsPcd(): boolean {
    
    return (this.frmCandidateProfile &&
            this.frmCandidateProfile.controls.pcd &&
            this.frmCandidateProfile.controls.pcd.value == 'true');
  }

  get etnicities(): Array<any> {

    return AppConstants.ethnicities;
  }

  get genders(): Array<any> {

    return AppConstants.genders;
  }

  get sexes(): Array<any> {

    return AppConstants.genders;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.frmCandidateProfile = this.fb.group({
      gender: ['', Validators.required],
      sex: ['', Validators.required],
      etnicity: ['', Validators.required],
      pcd: ['false'],
      pcdNote: [''],
    });
  }

  save(evtObj) {

  }
}
