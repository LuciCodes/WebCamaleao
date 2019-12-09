import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';

@Component({
  selector: 'app-matches-search',
  templateUrl: './matches-search.component.html',
  styleUrls: ['./matches-search.component.css']
})
export class MatchesSearchComponent implements OnInit {

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
