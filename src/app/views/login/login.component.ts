import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'
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
  error: boolean;
  errorMessage: string = '';
  constructor(private auth: AuthService, private router: Router, private formb: FormBuilder) {
    this.error = false;
    this.form = this.formb.group({
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])),
    })
  }
  ngOnInit(): void {
  }

  onLogin() {
    this.error = false;
    this.errorMessage = '';
    const body = this.form.value;
    console.log(body);
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

  public fieldTextType: boolean = false;
  toggleFieldTextType(){
    this.fieldTextType = !this.fieldTextType;
  }
}