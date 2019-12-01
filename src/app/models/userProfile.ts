
export class UserProfile {

  id: string;
  userId: string;

  name: string;

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