
export class CandidateProfile {
  
  id: string;
  userId: string;
  candidateId: string;

  gender: string;
  sex: string;
  ethnicity: string;
  pne: boolean = false;
  pneNote: string;

  updated: any;
  updatedUserId: string;

  constructor(baseObj?: any)
  {
    if (baseObj) {

      Object.assign(this, baseObj);
    }
  }

  public toDocumentObject(): any {

    return JSON.parse(JSON.stringify(this));
  }
}
