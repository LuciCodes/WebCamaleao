import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css']
})
export class OnboardComponent implements OnInit {

  frmPersonType: FormGroup;
  frmPersonalData: FormGroup;
  frmOrientation: FormGroup;

  ptBrDateMask = { mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /[1-2]/, /\d/, /\d/, /\d/] };
  documentMask = { mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/] };
  phoneMask = { mask: ['(', /[1-9]/, /[1-9]/, ')', ' ', /[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] };

  get personType(): string {

    return this.frmPersonType.controls.personType.value;
  }
  
  set personType(val: string) {

    this.frmPersonType.controls.personType.setValue(val);
  }

  get states(): Array<any> {

    return AppConstants.brazilianStates;
  }
  
  get cities(): Array<any> {

    if (this.frmPersonalData.controls.currentState.valid) {

      let theStateId = this.frmPersonalData.controls.currentState.value

      let theState = AppConstants.brazilianStates.find(s => s.abrev == theStateId);

      if (theState) {

        return theState.cities;
      }
    }

    return [];
  }

  get hasState(): boolean {

    return (this.frmPersonalData && this.frmPersonalData.controls.currentState.valid);
  }

  get personHasDisability(): boolean {
    
    return (this.frmOrientation &&
            this.frmOrientation.controls.hasDisability &&
            this.frmOrientation.controls.hasDisability.value == 'true');
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
      dateOfBirth: ['', Validators.required],
      document: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      currentState: ['', Validators.required],
      currentCity: ['', Validators.required]
    });
    
    this.frmPersonType = this.fb.group({
      personType: ['']
    });
    
    this.frmOrientation = this.fb.group({
      gender: ['', Validators.required],
      sex: ['', Validators.required],
      etnicity: ['', Validators.required],
      hasDisability: ['false'],
      specialNeeds: [''],
    });
  }

  chooseType(whichType: string) {

    this.personType = whichType;
  }

  proceedFromPersonalData(evtObj) {

  }

  proceedFromOrientation(evtObj) {

  }
}
