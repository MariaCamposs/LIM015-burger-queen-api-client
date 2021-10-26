import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faMinusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css']
})
export class AddOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faTrashAlt = faTrashAlt;
}
