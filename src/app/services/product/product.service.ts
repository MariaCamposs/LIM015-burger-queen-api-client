import { Injectable } from '@angular/core';
import { IProductDetail } from 'src/app/models/product-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private domain: string;
  private endpoint: string;

  constructor(private httpClient: HttpClient) {
    this.domain = environment.domain;
    this.endpoint = '/products';
  }

  getProducts(){
    return this.httpClient.get<IProductDetail>(`${this.domain}${this.endpoint}`);
  }
  getOneProduct(uid: any){
    return this.httpClient.get<IProductDetail>(`${this.domain}${this.endpoint}/${uid}`);
  }
  newProduct(body: any){
    return this.httpClient.post<IProductDetail>(`${this.domain}${this.endpoint}`, body);
  }
  updateProduct(uid: any, body: any){
    return this.httpClient.put<IProductDetail>(`${this.domain}${this.endpoint}/${uid}`, body);
  }
  deleteProduct(uid: any){
    return this.httpClient.delete<IProductDetail>(`${this.domain}${this.endpoint}/${uid}`)
  }
}
