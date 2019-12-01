
export class Course {

  id: string;

  name: string;
  institution: string;

  level: string;

  startDate: string;
  endDate: string;

  duration: string;
  state: string;
  area: string;
  
  constructor(baseObj?: any)
  {
    if (baseObj) {

      Object.assign(this, baseObj);
    }

    if (!this.id) {

      this.id = new Date().getTime().toString();
    }
  }

  public toDocumentObject(): any {

    let result = JSON.parse(JSON.stringify(this));

    return result;
  }
}