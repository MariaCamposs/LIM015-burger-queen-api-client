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
  options: Array<string>
  isSelect: boolean
  constructor(private router: Router, private auth: AuthService) {
    this.options = []
    this.isSelect = false
  }

  ngOnInit(): void {
    this.rolAccess()
  }

  rolAccess(){
    const token: any = localStorage.getItem('token');
    const roles: any = jwtDecode(token);

    let access = [];
    if(roles.roles.admin){
      access = ['home', 'profile', 'log out']
    } else {
      access = ['staff', 'profile', 'log out']
    }
    return this.options = access;
  }

  select(){
    this.isSelect = this.isSelect ? false : true;
  }

  redirect(element: string){
    switch (element){
      case 'home': this.router.navigate(['home']);
      break
      case 'staff': this.router.navigate(['staff']);
      break
      case 'profile': this.router.navigate(['']);
      break
      case 'logout': this.auth.logout();
      break
    }
  }
}
