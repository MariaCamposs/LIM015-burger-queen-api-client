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
  items: Array<OrdersModel>;
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
    this.items = []
    this.show = false;
  }

  ngOnInit(): void {
    this.showOrders();
  }

  showOrders() {
    this.orderService.getOrders().subscribe(
      (response: any) => {
        console.log(response)
        this.allOrders(response);
        this.filterStatus('delivering');
      }
    )
  }
  allOrders(order: Array<OrdersModel>) {
    this.orders = order;
  }

  filterStatus(status: any) {
    this.items = this.orders.filter((elem: OrdersModel) => {
      console.log('mostrando el status: ', status)
      console.log(this.items)
      return elem.status === status;
    })
  }

  updateStatus(item: any) {
    if (item.status === 'pending') {
      const order = {
        ...item,
        status: 'preparing'
      }
      this.orderService.updateOrder(item._id, order).subscribe(() => {
        console.log('cambiando status a preparing', order)
        this.orderService.newOrder(item)
        this.showOrders();
      })
    } else if (item.status === 'preparing') {
      const order = {
        ...item,
        status: 'delivering'
      }
      this.orderService.updateOrder(item._id, order).subscribe(() => {
        console.log('cambiando status a delivering', order)
        this.orderService.newOrder(item)
        this.showOrders();
      })
    } else if (item.status === 'delivering') {
      const order = {
        ...item,
        status: 'delivered'
      }
      this.orderService.updateOrder(item._id, order).subscribe(() => {
        console.log('cambiando status a delivered', order)
        this.orderService.newOrder(item)
        this.showOrders();
      })
    }
  }
}
