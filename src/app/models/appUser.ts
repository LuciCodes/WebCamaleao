
import { User } from 'firebase';
import { AppConstants } from '../etc/appConstants';

export class AppUser {

  uid: string;
  providerId: string;
  companyId: string;
  roleName: string;

  displayName: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
  state: string;

  updatedUserId: string;
  updated: any;

  fbUser: User;
  fbToken: firebase.auth.IdTokenResult;

  constructor(baseObj?: any) {
  
    if (baseObj) {

      Object.assign(this, baseObj);

      if (baseObj.fbUser && !baseObj.uid) { //cheap way to check we got the login obj only

        this.uid = baseObj.fbUser.uid;
        this.providerId = baseObj.fbUser.providerId;
        this.companyId = baseObj.fbUser.companyId;
        this.roleName = baseObj.fbUser.roleName;
        this.displayName = baseObj.fbUser.displayName;
        this.email = baseObj.fbUser.email;
        this.phoneNumber = baseObj.fbUser.phoneNumber;
        this.photoUrl = baseObj.fbUser.photoUrl;
        this.state = baseObj.fbUser.state;
        this.updatedUserId = baseObj.fbUser.updatedUserId;
        this.updated = baseObj.fbUser.updated;
      }
    }

    if (!this.roleName) {

      this.roleName = AppConstants.userRoles.candidate;
    }
  }
  
  toDocumentObject() {

    let result = JSON.parse(JSON.stringify(this));

    return result;
  }
}