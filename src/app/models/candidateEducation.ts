import { Certification } from './certification';
import { Course } from './course';

export class CandidateEducation {

  id: string;
  userId: string;
  candidateId: string;

  updated: any;
  updatedUserId: string;

  level: string = 'INDEFINIDA';

  certifications: Array<Certification> = [];
  
  courses: Array<Course> = [];
  
  constructor(baseObj?: any)
  {
    if (baseObj) {

      Object.assign(this, baseObj);
    }

    if (!this.level) {
      this.level = 'INDEFINIDA';
    }

    if (!this.certifications) { this.certifications = []; }
    if (!this.courses) { this.courses = []; }
  }

  public toDocumentObject(): any {

    let result = JSON.parse(JSON.stringify(this));

    return result;
  }
}