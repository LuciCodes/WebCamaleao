
import { User } from 'firebase';

export class AppUser {

  displayName: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
  providerId: string;
  state: string;
  type: string;
  uid: string;

  fbUser: User;
  fbToken: firebase.auth.IdTokenResult;

  constructor(baseObj?: any) {
  
    if (baseObj) {

      Object.assign(this, baseObj);

      if (baseObj.fbUser && !baseObj.uid) { //cheap way to check we got the login obj only
      
        this.displayName = baseObj.fbUser.displayName;
        this.email = baseObj.fbUser.email;
        this.phoneNumber = baseObj.fbUser.phoneNumber;
        this.photoUrl = baseObj.fbUser.photoUrl;
        this.providerId = baseObj.fbUser.providerId;
        this.state = baseObj.fbUser.state;
        this.type = baseObj.fbUser.type;
        this.uid = baseObj.fbUser.uid;
      }
    }
  }
}