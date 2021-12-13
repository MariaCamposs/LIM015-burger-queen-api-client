import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrdersModel } from 'src/app/models/order-model';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.css']
})
export class ModalOrderComponent implements OnInit {
  @Input() showOneOrder: boolean = false;
  @Input() order: any;
  @Output() close: EventEmitter<boolean> = new EventEmitter;
  @Output() show: EventEmitter<{}> = new EventEmitter;

  constructor(private orderService: OrderService) { }
  arrayOrder: Object = {
    _id: '',
    client: '',
    status: '',
    products: [],
    dateEntry: '',
    dateProcesed: ''
  }
  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit(false);
  }

  showOrders(){
    this.show.emit();
  }
  updateStatus(item: any) {
    if (item.status === 'pending') {
      const order = {
        ...item,
        status: 'canceled'
      }
      this.orderService.updateOrder(item._id, order).subscribe(() => {
        console.log('cambiando status a canceled', order)
        this.orderService.newOrder(item)
        this.showOrders();
      })
    }
  }
}
