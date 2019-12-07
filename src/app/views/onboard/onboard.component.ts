import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css']
})
export class OnboardComponent implements OnInit {

  frmUserType: FormGroup;
  frmCandidateBasicInfo: FormGroup;
  frmCandidateDiversity: FormGroup;

  get ptBrDateMask() { return AppConstants.ptBrDateMask; }
  get cpfMask() { return AppConstants.cpfMask; }
  get phoneMask() { return AppConstants.phoneMask; }

  get userType(): string {

    return this.frmUserType.controls.userType.value;
  }
  
  set userType(val: string) {

    this.frmUserType.controls.userType.setValue(val);
  }

  get states(): Array<any> {

    return AppConstants.brazilianStates;
  }
  
  get cities(): Array<any> {

    if (this.frmCandidateBasicInfo.controls.state.valid) {

      let theStateId = this.frmCandidateBasicInfo.controls.state.value

      let theState = AppConstants.brazilianStates.find(s => s.abrev == theStateId);

      if (theState) {

        return theState.cities;
      }
    }

    return [];
  }

  get hasState(): boolean {

    return (this.frmCandidateBasicInfo && this.frmCandidateBasicInfo.controls.state.valid);
  }

  get flagIsPcd(): boolean {
    
    return (this.frmCandidateDiversity &&
            this.frmCandidateDiversity.controls.pcd &&
            this.frmCandidateDiversity.controls.pcd.value == 'true');
  }

  get mayProceedFromOrientation(): boolean {

    return (this.frmCandidateBasicInfo &&
            this.frmCandidateBasicInfo.valid && 
            this.frmCandidateDiversity &&
            this.frmCandidateDiversity.valid);
  }


  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.frmCandidateBasicInfo = this.fb.group({
      name: ['', Validators.required],
      birth: ['', Validators.required],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      state: ['', Validators.required],
      currentCity: ['', Validators.required],
      signupState: ['COMPLETED']
    });
    
    this.frmUserType = this.fb.group({
      userType: ['']
    });
    
    this.frmCandidateDiversity = this.fb.group({
      gender: ['', Validators.required],
      sex: ['', Validators.required],
      ethnicity: ['', Validators.required],
      pcd: ['false'],
      pcdNote: [''],
    });
  }

  chooseType(whichType: string) {

    this.userType = whichType;
  }

  proceedFromPersonalData(evtObj) {

  }

  proceedFromOrientation(evtObj) {

  }
}
