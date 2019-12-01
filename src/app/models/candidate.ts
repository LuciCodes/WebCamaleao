
import { CandidateEducation } from './candidateEducation';
import { CandidateHabilities } from './candidateHabilities';
import { CandidatePreferences } from './candidatePreferences';
import { CandidateProfile } from './candidateProfile';

/*

  birth: "04091995"
  cpf: "42216942898"
  ethnicity: "Negro"
  gender: "Mulher Cisgênero"
  location': "SP - Osasco"
  name: "Bruna Souza Felipe"
  pcd: false
  pcdNote: ""
  phone: "11987415168"
  photoUrl: "https://firebasestorage.googleapis.com/v0/b/camaleao-b6f8f.appspot.com/o/profile_photos%2Fimage%3A78?alt=media&token=04e7e984-4812-4c59-866f-1d5530742401"
  region: "Osasco"
  sex: "Homossexual"
  signUpState: "COMPLETED"
  state: "SP"

*/
export class Candidate {

  id: string;
  userId: string;

  birth: string;
  cpf: string;
  ethinicity: string;
  gender: string;
  location: string;
  name: string;
  pcd: boolean;
  pcdNote: string;
  phone: string;
  photoUrl: string;
  region: string;
  sex: string;
  signUpState: string;
  state: string;

  docRg: string;

  addrCity: string;
  addrState: string;
  addrDistrict: string;

  updated: any;
  updatedUserId: string;

  isSocialName: boolean = false;

  constructor(baseObj?: any) {

    if (baseObj) {
      Object.assign(this, baseObj);
    }
  }

  toDocumentObject() {

    let result = JSON.parse(JSON.stringify(this));

    return result;
  }
}