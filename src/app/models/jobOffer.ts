
export class JobOffer {

  id: string;

  companyId: string;
  companyName: string;
  companyAuxId: string;

  title: string;
  level: string;
  description: string;
  hours: string;

  locationTxt: string;

  areas: Array<string> = [];
  habilities: Array<string> = [];
  tags: Array<string> = [];

  updated: any;
  updatedUserId: string;

  constructor(baseObj?: any)
  {
    if (baseObj) {

      Object.assign(this, baseObj);
    }
  }

  public toDocumentObject(): any {

    let result = JSON.parse(JSON.stringify(this));

    return result;
  }
}