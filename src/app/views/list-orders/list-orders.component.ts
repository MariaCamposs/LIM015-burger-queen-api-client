import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { OrdersModel } from 'src/app/models/order-model';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {

  orders: Array<OrdersModel>;
  show: boolean;
  p: number = 1;
  id: number = 1;
  status: string = ''
  order: any;
  modalOrder = false;
  arrayOrder: Object = {
    _id: '',
    client: '',
    status: '',
  }
  constructor(private router: Router, private orderService: OrderService) {
    this.orders = []
    this.show = false;
   }

  ngOnInit(): void {
    this.showOrders();
  }

  showOrders(){
    this.orderService.getOrders().subscribe(
      (response: any) => {
        console.log(response)
        this.allOrders(response);
      }
    )
  }
  allOrders(order: Array<OrdersModel>){
    this.orders = order;
  }

  updateStatus(item: any){
    if(item.status === 'pending'){
      const order = {
        ...item,
        status: 'delivering'
      }
      this.orderService.updateOrder(item._id, order).subscribe(() => {
        console.log(order)
        this.orderService.newOrder(item)
        this.showOrders();
      })
    }
  }
}
