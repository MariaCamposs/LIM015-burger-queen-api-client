import { Component, OnInit } from '@angular/core';
import { faUserAlt, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service'
import { LoginI } from '../../models/login.interface';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/Operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  error: boolean = false;
  errorMessage: string = '';
  constructor(private auth: AuthService, private router: Router, private formb: FormBuilder) {
    this.error = false;
    this.form = this.formb.group({ email: new FormControl('', Validators.compose([Validators.required])) },
      { password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(8)])), })
  }
  ngOnInit(): void {
  }
  onLogin() {
    this.error = false;
    this.errorMessage = '';
    const body = this.form.value;
    this.auth.loginByEmail(body).pipe(
      catchError((error) => {
        if (error) {
          this.error = true;
          this.errorMessage = 'correo o contraseña incorrecta';
        }
        return throwError(error);
      })
    )
      .subscribe((data: any) => {
        this.error = false;
        window.localStorage.setItem('token', data.token);
        const token: any = jwtDecode(data.token);
        if (token.roles.admin) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['staff']);
        }
      })
  }


  faUserAlt = faUserAlt;
  faLock = faLock;
  faEyeSlash = faEyeSlash;
}
