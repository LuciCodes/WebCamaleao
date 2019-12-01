
export class Certification {

  id: string;

  name: string;
  institution: string;
  year: string;
  description: string;
  
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