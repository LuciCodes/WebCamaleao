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
  frmPersonalData: FormGroup;
  frmOrientation: FormGroup;

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

    if (this.frmPersonalData.controls.state.valid) {

      let theStateId = this.frmPersonalData.controls.state.value

      let theState = AppConstants.brazilianStates.find(s => s.abrev == theStateId);

      if (theState) {

        return theState.cities;
      }
    }

    return [];
  }

  get hasState(): boolean {

    return (this.frmPersonalData && this.frmPersonalData.controls.state.valid);
  }

  get flagIsPcd(): boolean {
    
    return (this.frmOrientation &&
            this.frmOrientation.controls.pcd &&
            this.frmOrientation.controls.pcd.value == 'true');
  }

  get mayProceedFromOrientation(): boolean {

    return (this.frmPersonalData &&
            this.frmPersonalData.valid && 
            this.frmOrientation &&
            this.frmOrientation.valid);
  }


  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.frmPersonalData = this.fb.group({
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
    
    this.frmOrientation = this.fb.group({
      gender: ['', Validators.required],
      sex: ['', Validators.required],
      etnicity: ['', Validators.required],
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
