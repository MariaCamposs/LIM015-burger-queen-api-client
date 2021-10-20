export interface IUserModel {
  user?: Array<IUserDetail>;
}
export interface IUserDetail {
  _id?: string,
  email?: string,
  roles: Rol;
}
export interface Rol{
  admin: boolean;
}