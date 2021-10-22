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
        console.log(response);
        this.allUsers(response);
      })
  }
  allUsers(ele: Array<IUserDetail>) {
    ele.forEach((el: IUserDetail) => {
      this.users.push(el);
    })
  }

  deleteUser(id: any) {
    console.log(id);
    this.removeItem(id)
    this.userService.deleteOneUser(id)
      .subscribe((response) => {
        this.arrayUser = response
        this.router.navigate(['manageusers'])
        console.log(this.arrayUser);
      })
  }
  removeItem(idD: any) {
    let objIndex = this.users.findIndex(((obj: any) => {
      console.log(obj._id)
      console.log(idD)
      obj._id === idD
    }));
    console.log(objIndex)
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

  getUser(user: any){
    this.show = true;
  }

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
}
