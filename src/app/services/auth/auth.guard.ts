import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import jwtDecode from 'jwt-decode';
import { unwatchFile } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private AuthService: AuthService, private route: Router) { }

  canActivate() {
    try {
      const local: any = this.AuthService.getToken();
      const token: any = jwtDecode(local);
      if (!token.roles.admin) {
        this.route.navigate(['login']);
        return false;
      }
    } catch (error) {
      this.route.navigate(['login']);
    }
    return true;
  }
}
