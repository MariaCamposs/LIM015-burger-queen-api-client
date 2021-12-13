import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  order!: Object;
  modalOrder = false;
  arrayOrder: Object = {
    _id: '',
    client: '',
    status: '',
    products: [],
    dateEntry: '',
    dateProcesed: ''
  }
  constructor(private router: Router, private orderService: OrderService) {
    this.orders = []
    this.items = []
    this.show = false;
  }

  ngOnInit(): void {
    this.showOrders();
  }

  filterStatus(stats: any) {
    this.items = this.orders.filter((order: any) => {
      if(order.status === stats){
        console.log(order)
        return order
      }
    });
  }

  showOrders() {
    this.orderService.getOrders().subscribe(
      (response: any) => {
        console.log(response)
        this.allOrders(response);
        this.filterStatus('pending');
      }
    )
  }
  allOrders(order: Array<OrdersModel>) {
    this.orders = order;
  }

  showOrder(currentOrder: Object) {
    this.order = currentOrder;
    this.modalOrder = true;
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

  closeEdit(e: boolean) {
    this.modalOrder = e;
  }
  getOrder() {
    this.show = true;
  }
}
