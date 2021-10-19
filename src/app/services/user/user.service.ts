import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUserDetail } from 'src/app/models/user-model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private domain: string;
  private endpoint: string;

  constructor(private httpClient: HttpClient) {
    this.domain = environment.domain;
    this.endpoint = '/users';
  }
  getUsers(){
    return this.httpClient.get<IUserDetail>(`${this.domain}${this.endpoint}`);
  }
  getOneUser(uid: any){
    return this.httpClient.get<IUserDetail>(`${this.domain}${this.endpoint}/${uid}`);
  }
  newUser(body: any){
    return this.httpClient.post<IUserDetail>(`${this.domain}${this.endpoint}`, body);
  }
  updateUser(uid: any, body: any){
    return this.httpClient.put<IUserDetail>(`${this.domain}${this.endpoint}`, body);
  }
  deleteOneUser(uid: any){
    return this.httpClient.delete<IUserDetail>(`${this.domain}${this.endpoint}${uid}`)
  }
}
