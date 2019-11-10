import { Certification } from './certification';
import { Course } from './course';

export class CandidateEducation {

  candidateId: string;

  level: string;

  certifications: Array<Certification> = [];
  
  courses: Array<Course> = [];
}