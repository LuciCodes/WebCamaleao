
export class JobOfferSearchParams {

  text: string;
  companyId: string;
  companyName: string;
  areas: Array<any>;
  tags: string;
  locationType: string;
  seachNearZip: string;
  searchInStates: Array<any>;
  searchInCities: Array<any>;
  searchInCitiesOfState: Array<any>;

  forceReload: boolean = false;

  constructor(baseObj?: any) {

    if (baseObj) {
      Object.assign(this, baseObj);
    }
  }
}