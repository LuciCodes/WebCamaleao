import { Component, OnInit, Input } from '@angular/core';
import { AppConstants } from 'src/app/etc/appConstants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-candidate-profile',
  templateUrl: './form-candidate-profile.component.html',
  styleUrls: ['./form-candidate-profile.component.css']
})
export class FormCandidateProfileComponent implements OnInit {

  public frmCandidateProfile: FormGroup;

  get ptBrDateMask() { return AppConstants.ptBrDateMask; }
  get cpfMask() { return AppConstants.cpfMask; }
  get phoneMask() { return AppConstants.phoneMask; }

  get flagIsPcd(): boolean {
    
    return (this.frmCandidateProfile &&
            this.frmCandidateProfile.controls.pcd &&
            this.frmCandidateProfile.controls.pcd.value == 'true');
  }

  get mayProceedFromOrientation(): boolean {

    return (this.frmCandidateProfile &&
            this.frmCandidateProfile.valid);
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

  proceedFromPersonalData(evtObj) {

  }

  proceedFromOrientation(evtObj) {

  }
}
