import { Skill } from './skill';

export class CandidateHabilities {

  id: string;
  userId: string;
  candidateId: string;

  updated: any;
  updatedUserId: string;

  list: string;

  constructor(baseObj?: any)
  {
    if (baseObj) {

      Object.assign(this, baseObj);
    }

    if (!this.list) {
      this.list = '';
    }
  }

  public toDocumentObject(): any {

    let result = JSON.parse(JSON.stringify(this));

    return result;
  }
}