import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/etc/appConstants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Candidate } from 'src/app/models/candidate';
import { UserService } from 'src/app/services/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidateDetails } from 'src/app/models/candidateDetails';

@Component({
  selector: 'app-candidate-cv',
  templateUrl: './candidate-cv.component.html',
  styleUrls: ['./candidate-cv.component.css']
})
export class CandidateCvComponent implements OnInit {

  public flagLoadingData = false;

  candidateDetails: CandidateDetails;
  
  constructor(private userService: UserService,
              private snackBar: MatSnackBar) {

  }

  async ngOnInit() {

    this.flagLoadingData = true;

    this.candidateDetails = await this.userService.getUserCandidateDetails();

    this.flagLoadingData = false;
  }
}
