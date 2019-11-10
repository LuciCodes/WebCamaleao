import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';

@Component({
  selector: 'app-candidate-preferences',
  templateUrl: './candidate-preferences.component.html',
  styleUrls: ['./candidate-preferences.component.css']
})
export class CandidatePreferencesComponent implements OnInit {

  public frmCandidatePreferences: FormGroup;

  public get educationalLevels(): Array<any> {

    return AppConstants.educationalLevels;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.frmCandidatePreferences = this.fb.group({

      level: ['', Validators.required]
    });
  }

  save(evtObj) {

  }
}
