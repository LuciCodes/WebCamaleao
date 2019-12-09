
export class JobOffer {

  id: string;

  companyId: string;
  
  title: string;
  description: string;
  locationTxt: string;

  level: string;

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