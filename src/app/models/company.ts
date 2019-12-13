
export class Company {

  id: string;

  name: string;
  description: string;
  logoUrl: string;
  areas: Array<string>;
  
  created: any;
  updated: any;
  ownerUserId: string;
  updatedUserId: string;

  constructor(baseObj?: any)
  {
    if (baseObj) {

      Object.assign(this, baseObj);
    }

    if(!this.id) {

      this.id = new Date().getTime().toString();
    }
  }

  public toDocumentObject(): any {

    let result = JSON.parse(JSON.stringify(this));

    return result;
  }
}