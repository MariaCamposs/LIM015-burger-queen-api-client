export interface LoginI{
  email:string,
  password:string
}

export interface UserAdmin{
  _id:string,
  email:string,
  password:string,
  roles: Rol
}

export interface Rol {
  admin:boolean
}