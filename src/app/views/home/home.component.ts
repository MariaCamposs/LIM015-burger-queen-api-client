import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }
  btnUser() {
    const token: any = localStorage.getItem('token');
    const roles: any = jwtDecode(token);

    if (roles.roles.admin) {
      this.router.navigate(['adduser']);
      console.log('estoy en adduser')
    }
  }
  btnProduct() {
    const token: any = localStorage.getItem('token');
    const roles: any = jwtDecode(token);

    if (roles.roles.admin) {
      this.router.navigate(['addproduct']);
      console.log('estoy en addproduct')
    }
  }
}
