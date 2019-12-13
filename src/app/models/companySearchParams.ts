
export class CompanySearchParams {

  id: string;
  name: string;

  forceReload: boolean = false;

  constructor(baseObj?: any) {

    if (baseObj) {
      Object.assign(this, baseObj);
    }
  }
}