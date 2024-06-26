import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';

@Component({
  selector: 'app-matches-basic-info',
  templateUrl: './matches-basic-info.component.html',
  styleUrls: ['./matches-basic-info.component.css']
})
export class MatchesBasicInfoComponent implements OnInit {

  public frmMatchPreferences: FormGroup;

  public get educationalLevels(): Array<any> {

    return AppConstants.educationalLevels;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.frmMatchPreferences = this.fb.group({

      level: ['', Validators.required]
    });
  }

  save(evtObj) {

  }
}
