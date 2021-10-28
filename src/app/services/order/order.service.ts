import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrdersModel } from 'src/app/models/order-model';
import { IProductDetail } from 'src/app/models/product-model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: OrdersModel[] = []
  private cart = new BehaviorSubject<Array<OrdersModel>>([]);
  cart$ = this.cart.asObservable();
  publishOrder(order: OrdersModel) {
    this.orders = [...this.orders, order]
    this.cart.next(this.orders)
  }
  private domain: string;
  private endpoint: string;

  constructor(private httpClient: HttpClient) {
    this.domain = environment.domain;
    this.endpoint = '/orders';
  }

  getOrders(): Observable<OrdersModel[]> {
    return this.httpClient.get<Array<OrdersModel>>(`${this.domain}${this.endpoint}`);
  }
  getOneOrder(uid: string) {
    return this.httpClient.get<OrdersModel>(`${this.domain}${this.endpoint}/${uid}`);
  }
  updateOrder(uid: any, body: any) {
    return this.httpClient.put<OrdersModel>(`${this.domain}${this.endpoint}/${uid}`, body);
  }
  newOrder(body: any) {
    return this.httpClient.post<Array<IProductDetail>>(`${this.domain}${this.endpoint}`, body);
  }
  deleteOrder(uid: string): Observable<OrdersModel> {
    return this.httpClient.delete<OrdersModel>(`${this.domain}${this.endpoint}/${uid}`)
  }
}
