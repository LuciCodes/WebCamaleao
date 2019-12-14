
export class CompanySearchParams {

  id: string;
  name: string;

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