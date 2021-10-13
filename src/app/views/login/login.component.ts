import { Component, OnInit } from '@angular/core';
import { faUserAlt, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service'
import { LoginI } from '../../models/login.interface';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router: Router) { }
  public user: LoginI = {
    email: '',
    password: ''
  };
  error: boolean = false;
  errorMessage: string = '';
  ngOnInit(): void {
  }
  onLogin(){
    if(this.user.email == '' || this.user.password == ''){
      this.error = true;
      this.errorMessage = 'Por favor complete los campos';
    } else {
      this.error = true;
      this.errorMessage = 'Espere un momento...'
      this.auth.loginByEmail(this.user.email, this.user.password).subscribe(data =>{
        console.log(data);
        this.auth.setToken(data.token);
        const token: any = jwtDecode(data.token);
        if(token.roles.admin){
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['staff']);
        }
      }, error => {
        if(error.status === 0){
          this.error = true;
          this.errorMessage = 'Denegado';
        } else if ( error.status === 400){
          this.error = true;
          this.errorMessage = 'Por favor, ingrese un correo o contraseña válida'
        }
      });
    }
    }


  faUserAlt = faUserAlt;
  faLock = faLock;
  faEyeSlash = faEyeSlash;
}
