
export class AppUser {

  id: string;

  name: string;

  avatarUrl?: string;

  email: string;
  password?: string;

  emailConf?: string;
  passwordConf?: string;

  logged: boolean;
  token?: string;

  docNumber: string;

  phoneNumber: string;

  isLoginValid: boolean = false;
  isSubscriptionValid: boolean = false;

  constructor(baseObj?: any) {

    if (baseObj) {

      Object.assign(this, baseObj);

      if (!this.name && this.email) {

        this.name = this.email.split('@')[0];
      }
    }
  }
}
