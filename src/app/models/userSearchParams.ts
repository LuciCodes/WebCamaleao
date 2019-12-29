
export class UserSearchParams {

  id: string;
  name: string;
  email: string;

  forceReload: boolean = false;

  constructor(baseObj?: any) {

    if (baseObj) {
      Object.assign(this, baseObj);
    }
  }
}