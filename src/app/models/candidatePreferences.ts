
export class CandidatePreferences {
  
  candidateId: string;

  mainCareerInterest: string;

  jobHuntingStatus: string;

  profileVisibility: string;

  latestOrCurrentSalary: number;
  latestOrCurrentRegimen: string; /* CLT | PJ */
  
  nextSalaryExpectation: number;
  nextSalaryRegimen: string;  /* CLT | PJ */

  availableForRegimens: Array<string>;

  howMuchInNeed: number;

  availableForEnvironment: string;  /* remoto|presencial|ambos */
  
  availableForLocations: Array<string>;

  blockedCompanyIds: Array<string>;
}