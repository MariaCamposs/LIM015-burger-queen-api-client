export interface IUserModel {
  product?: Array<IProductDetail>;
}
export interface IProductDetail {
  _id?: string,
  name?: string,
  price?: number;
  image?: string,
  type?: string,
  dateEntry?: Date
}