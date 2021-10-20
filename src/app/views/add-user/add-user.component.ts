import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserDetail } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userData: any;
  users: Array<IUserDetail>
  public form: FormGroup;
  @Input() user: any;
  @Output() createUser: EventEmitter<{}> = new EventEmitter();

  id: string = ''
  email: string = ''
  password: string = ''
  roles: Object = {}
  admin: string = ''

  emailForm = new FormControl('', [Validators.required]);
  passwordForm = new FormControl('', [Validators.required]);
  rolForm = new FormControl('', Validators.required)

  constructor(private userService: UserService, private router: Router) {
    this.userData = {}
    this.users = []
    this.form = new FormGroup({ //esta funcion recibe un objeto que ser'a parte del group
      email: this.emailForm,
      password: this.passwordForm,
      rol: this.rolForm
    })
    this.user;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const newUser = {
      email: this.emailForm.value,
      password: this.passwordForm.value,
      roles: {
        admin: this.rolForm.value
      }
    }
    this.createUser.emit(newUser)
    console.log('saved', newUser)

    this.userService.newUser(newUser).subscribe(
      (response: any) => {
        this.userData = response;
        console.log(this.userData)
        this.users.push(this.userData);
      }
    )
    this.form.reset()
  }

  btnViewUsers(){
    this.router.navigate(['manageusers']);
  }
}
