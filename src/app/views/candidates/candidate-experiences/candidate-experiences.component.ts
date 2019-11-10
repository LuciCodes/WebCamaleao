import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate-experiences',
  templateUrl: './candidate-experiences.component.html',
  styleUrls: ['./candidate-experiences.component.css']
})
export class CandidateExperiencesComponent implements OnInit {

  public frmCandidateExperience: FormGroup;

  constructor(private fb: FormBuilder) {}

  experieces: Array<any> = [
    {
      companyName: 'Tesla',
      roleName: 'Factory Manager',
      description: 'Manager of a Tesla factory',
      startDate: 'Jan/2021',
      endDate: null,
      isCurrent: true
    },
    {
      companyName: 'Via Varejo',
      roleName: 'Web Developer',
      description: 'Making websites',
      startDate: 'Jan/2021',
      endDate: null,
      isCurrent: true
    }
  ];

  ngOnInit() {

    this.frmCandidateExperience = this.fb.group({

      companyName: ['', Validators.required],
      roleName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      isCurrent: ['']
    });
  }

  save(evtObj) {

  }
}
