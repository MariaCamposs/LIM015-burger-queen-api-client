import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!: Object;
  myModalEdit = false;

  constructor(private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  btnHome(){
    const token: any = localStorage.getItem('token');
    const roles: any = jwtDecode(token);

    if (roles.roles.admin) {
      this.router.navigate(['home']);
      console.log('estoy en home')
    } else {
      this.router.navigate(['staff']);
    }
  }
  btnLogout(){
    this.auth.logout();
  }
  btnProfile(currentUser: Object){
    console.log('estoy en mi perfil')
    this.user = currentUser;
    this.myModalEdit = true;
    this.router.navigate(['profile']);

  }
}
