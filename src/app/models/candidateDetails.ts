
import { CandidateEducation } from './candidateEducation';
import { CandidateHabilities } from './candidateHabilities';
import { CandidateProfile } from './candidateProfile';
import { Candidate } from './candidate';
import { Input } from '@angular/core';

export class CandidateDetails {

  @Input()
  candidate: Candidate;
  
  @Input()
  candidateEducation: CandidateEducation;
  
  @Input()
  candidateHabilities: CandidateHabilities;

  @Input()
  candidateProfile: CandidateProfile;

  constructor(baseObj?: any) {

    if (baseObj) {
      Object.assign(this, baseObj);
    }
  }

  toDocumentObject() {

    let result = JSON.parse(JSON.stringify(this));

    return result;
  }
}