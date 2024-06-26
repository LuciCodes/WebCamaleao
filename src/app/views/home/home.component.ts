import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  get userIsCandidate(): boolean {

    return this.userService.userIsCandidate;
  }
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    
  }

}
