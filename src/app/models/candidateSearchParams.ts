
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
export class CandidateSearchParams {

  idCpf: string;
  name: string;
  genders: Array<any>;
  sexes: Array<any>;
  pcd: boolean;
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