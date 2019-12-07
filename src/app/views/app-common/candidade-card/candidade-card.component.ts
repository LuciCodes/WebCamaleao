import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/models/candidate';

@Component({
  selector: 'app-candidade-card',
  templateUrl: './candidade-card.component.html',
  styleUrls: ['./candidade-card.component.css']
})
export class CandidadeCardComponent implements OnInit {

  @Input()
  public candidate: Candidate;

  constructor() { }

  ngOnInit() {
  }

  isDefaultPhoto(person: Candidate) {

    return (!person || !person.photoUrl || person.photoUrl == '');
  }

  photoOf(person: Candidate) {

    let result = (person && person.photoUrl) ? person.photoUrl : '/assets/img/default-avatar.png';

    return result;
  }

  locationOf(person: Candidate) {

    if (!person) { return ''; }

    let result = person.addrState;

    if (person.addrCity) {
      result = `${ person.addrCity } - ${ person.addrState }`;
    }
    
    if (person.addrDistrict) {
      result = `${ person.addrDistrict }, ${ result }`;
    }

    return result;
  }

  summaryOf(person: Candidate) {

    let result = person.gender ? person.gender.toLowerCase() : '';

    if (person.ethinicity) {
      result = `${ result }, ${ person.ethinicity.toLowerCase() }`;
    }
    
    if (person.sex) {
      result = `${ result }, ${ person.sex.toLowerCase() }`;
    }

    return result;
  }
}
