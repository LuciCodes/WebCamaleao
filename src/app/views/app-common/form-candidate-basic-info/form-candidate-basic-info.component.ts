import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';

@Component({
  selector: 'app-form-candidate-basic-info',
  templateUrl: './form-candidate-basic-info.component.html',
  styleUrls: ['./form-candidate-basic-info.component.css']
})
export class FormCandidateBasicInfoComponent implements OnInit {

  public frmCandidateBasicInfo: FormGroup;

  get ptBrDateMask() { return AppConstants.ptBrDateMask; }
  get cpfMask() { return AppConstants.cpfMask; }
  get phoneMask() { return AppConstants.phoneMask; }

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

  constructor(private fb: FormBuilder) {
    
    this.frmCandidateBasicInfo = this.fb.group({
      name: ['', Validators.required],
      birth: ['', Validators.required],
      docName: [''],
      docRg: ['', Validators.required],
      state: ['', Validators.required],
      currentCity: ['', Validators.required],
      signupState: ['COMPLETED'],
      addrCity: ['', Validators.required],
      addrState: ['', Validators.required],
      addrCep: ['', Validators.required],
      addrDistrict: ['', Validators.required]
    });
  }

  ngOnInit() {

  }
}
