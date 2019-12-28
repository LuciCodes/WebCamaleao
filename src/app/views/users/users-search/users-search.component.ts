import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';
import { WebApiService } from 'src/app/services/webApi.service';
import { User } from 'src/app/models/user';
import { UserSearchParams } from 'src/app/models/userSearchParams';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent  {

  get cepMask() { return AppConstants.cepMask; }

  frmSearch: FormGroup;

  flagLoadingData: boolean = false;

  userList: Array<User>;

  displayedColumns: string[] = ['uid', 'displayName', 'email', 'phoneNumber', 'providerId'];

  get roleList(): Array<any> {

    return AppConstants.userRoles.list;
  }

  initForm(obj: any = {}) {

    this.frmSearch = this.fb.group({
      nameOrEmail: [obj.nameOrEmail],
      roles: [obj.roles]
    });
  }

  constructor(private userService: UserService, private fb: FormBuilder) {
  
    this.initForm();
  }

  search() {
    
    this.flagLoadingData = true;
    
    window.setTimeout(() => {
  
      let params = new UserSearchParams(this.frmSearch.value);

      params.forceReload = true;

      this.userService.searchUsers(params, this.userService.users).then((list) => {

        this.userList = list;

        console.log('UserList:', this.userList);

        this.flagLoadingData = false;
      });
      
    }, 420);
  }

  clearParams() {

    this.userService.clearSearchParams();

    this.initForm({});
  }

}
