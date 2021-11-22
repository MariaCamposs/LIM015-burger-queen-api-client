import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  errorMessage: string = '';
  @Input() user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getUser(singleUser: any) {
    console.log(singleUser._id);
    this.userService.getOneUser(singleUser._id)
      .subscribe((response: any) => {
        const myuser = response.email;
        console.log(myuser)
        this.currentUser(response);
      })
  }

  currentUser(cUser: Object) {
    this.user.push(cUser);
  }

  updateUser(email: string, password: string) {
    if (email == '' || password == '') {
      this.errorMessage = 'Ingrese datos en alguno de los campos para actualizar';
    } else {
      console.log('actualizar');
      const userUpdate = {
        email: email,
        password: password,
      }
      console.log(userUpdate);
      this.userService.updateUser(this.user._id, userUpdate).subscribe(() => {
      })
    }
  }

  findUser(idD: any){
    let objIndex = this.user.findIndex(((obj: any) => {
      obj._id === idD
    }));
    console.log(objIndex);
  }
}
