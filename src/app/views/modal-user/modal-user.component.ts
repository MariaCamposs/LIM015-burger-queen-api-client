import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {

  errorMessage: string = '';
  @Input() editUser: boolean = false;
  @Input() user: any;
  @Output() close: EventEmitter<boolean> = new EventEmitter;
  @Output() show: EventEmitter<{}> = new EventEmitter;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.close.emit(false);
  }

  showUsers(){
    this.show.emit();
  }

  updateUser(email: string, password: string, rol: string){
    if(email == '' || rol == ''){
      this.errorMessage = 'Ingrese datos en alguno de los campos para actualizar';
    } else {
      const userUpdate = {
        email: email,
        password: password,
        roles: {
          admin: rol == 'true' ? true : false
        }
      }
      console.log(userUpdate);
      let id = this.user._id
      this.userService.updateUser(id, userUpdate).subscribe(() => {
        this.closeModal();
        this.showUsers();
      });
    }
  }

}
