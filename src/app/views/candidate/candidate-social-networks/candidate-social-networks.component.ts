import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/etc/appConstants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate-social-networks',
  templateUrl: './candidate-social-networks.component.html',
  styleUrls: ['./candidate-social-networks.component.css']
})
export class CandidateSocialNetworksComponent implements OnInit {

  public frmCandidateSocialNetworks: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.frmCandidateSocialNetworks = this.fb.group({
      linkToLinkedIn:  [''],
      linkToPortfolio:  [''],
      linkToFacebook:  [''],
      linkToGit:  [''],
      linkToBehance:  ['']
    });
  }

  save(evtObj) {

  }
}
