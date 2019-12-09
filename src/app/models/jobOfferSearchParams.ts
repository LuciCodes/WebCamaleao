
export class JobOfferSearchParams {

  text: string;
  areas: Array<any>;
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