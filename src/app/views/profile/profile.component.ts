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
      let id = this.user._id
      this.userService.updateUser(id, userUpdate).subscribe(() => {
      })
    }
  }
}
