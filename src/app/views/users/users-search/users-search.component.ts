import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/etc/appConstants';
import { WebApiService } from 'src/app/services/webApi.service';
import { AppUser } from 'src/app/models/appUser';
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

  public flagLoadingData: boolean = false;

  userList: Array<any>;

  displayedColumns: string[] = ['uid', 'displayName', 'email', 'phoneNumber', 'providerId'];

  get currentPageIdx() {

    return (this.userService.searchPage - 1);
  }
  
  set currentPageIdx(value: number) {

    this.userService.searchPage = value + 1;
  }
  
  get searchPageSize() {

    return (this.userService.searchPageSize);
  }
  
  set searchPageSize(value: number) {

    this.userService.searchPageSize = value;
  }

  get roleList(): Array<any> {

    return AppConstants.userRoles.list;
  }

  initForm(obj: any = {}) {

    this.frmSearch = this.fb.group({
      id: [obj.id],
      name: [obj.name],
      email: [obj.email],
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

        this.userList = list as Array<any>;

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
