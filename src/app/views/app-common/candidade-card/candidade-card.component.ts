import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/models/candidate';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-candidade-card',
  templateUrl: './candidade-card.component.html',
  styleUrls: ['./candidade-card.component.css']
})
export class CandidadeCardComponent implements OnInit {

  @Input()
  public candidate: Candidate;

  constructor(public imgService: ImageService) { }

  ngOnInit() {
  }

  isDefaultPhoto(person: Candidate) {

    return (!person || !person.photoUrl || person.photoUrl == '');
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
