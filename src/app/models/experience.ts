
export class Experience {

  id: string;
  userId: string;
  candidateId: string;

  companyId: string;

  companyName: string;
  roleName: string;
  description: string;

  startDate: string;
  endDate?: string;

  isCurrent: boolean;
  
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