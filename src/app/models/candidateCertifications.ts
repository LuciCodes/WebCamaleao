import { Certification } from './certification';

export class CandidateCertifications {

  linkToLinkedIn: string;
  linkToPortfolio: string;
  linkToGithub: string;
  linkToStackOverflow: string;
  linkToDribbble: string;
  linkToBehance: string;
  
  certifications: Array<Certification> = [];
}