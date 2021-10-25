import { Component, OnInit } from '@angular/core';
import { IUserDetail } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user/user.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: Array<IUserDetail>;
  show: boolean;
  user!: Object;
  myModalEdit = false;
  arrayUser: Object = {
    _id: '',
    email: '',
    roles: {
      admin: null
    }
  }

  constructor(private userService: UserService, private router: Router) {
    this.users = [];
    this.show = false;
  }

  ngOnInit(): void {
    this.showUsers();

  }

  showUsers() {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.allUsers(response);
      })
  }
  allUsers(ele: Array<IUserDetail>) {
      this.users = ele;
  }

  deleteUser(id: any) {
    this.removeItem(id)
    this.userService.deleteOneUser(id)
      .subscribe((response) => {
        this.arrayUser = response
        this.showUsers();
      })
  }
  removeItem(id: any) {
    let objIndex = this.users.findIndex(((obj: any) => {
      obj._id === id
    }));
    if (objIndex != -1) {
      this.users.splice(objIndex, 1)
    }
  }

  showEdit(currentUser: Object){
    this.user = currentUser;
    this.myModalEdit = true;
  }
  closeEdit(e: boolean){
    this.myModalEdit = e;
  }

  getUser(){
    this.show = true;
  }

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
}
