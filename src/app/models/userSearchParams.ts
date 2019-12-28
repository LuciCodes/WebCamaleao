
export class UserSearchParams {

  id: string;
  name: string;
  roles: Array<any>;

  forceReload: boolean = false;

  constructor(baseObj?: any) {

    if (baseObj) {
      Object.assign(this, baseObj);
    }
  }
}