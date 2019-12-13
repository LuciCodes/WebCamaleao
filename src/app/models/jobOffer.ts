
export class JobOffer {

  id: string;

  companyId: string;
  companyName: string;
  companyAuxId: string;

  title: string;
  level: string;
  description: string;
  jobOfferType: string;

  locationState: string;
  locationCity: string;
  locationDistrict: string;
  locationZipCode: string;
  locationLat: string;
  locationLng: string;

  areas: Array<string> = [];
  habilities: Array<string> = [];
  tags: Array<string> = [];

  created: any;
  updated: any;
  ownerUserId: string;
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