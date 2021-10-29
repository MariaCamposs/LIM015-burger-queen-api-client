import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faPlusCircle, faMinusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { IOrdersModel, OrderProductModel } from 'src/app/models/order-model';
import { IProductDetail } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product/product.service';
import { OrderService } from 'src/app/services/order/order.service';
import { catchError } from 'rxjs/Operators';
import { throwError } from 'rxjs';
import { QueryValueType } from '@angular/compiler/src/core';
@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css']
})
export class AddOrdersComponent implements OnInit {

  products: Array<IProductDetail>;
  product!: Object;
  productsType = new Set();
  typesProduct = 'bebidas';
  items: Array<IProductDetail>;
  show: boolean;
  showButton: boolean;
  productItem: Array<OrderProductModel>
  total: number
  nameClient: FormControl
  client: string
  today: number

  constructor(private productService: ProductService, private orderService: OrderService) {
    this.productItem = []
    this.products = []
    this.items = []
    this.show = false;
    this.showButton = false
    this.nameClient = new FormControl('', [Validators.required]);
    this.total = 0
    this.client = ""
    this.today = Date.now()
  }

  ngOnInit(): void {
    this.showProducts();
  }

  showProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        console.log(response);
        this.allProducts(response);
        this.filterType('Bebidas')
      }
    )
  }
  allProducts(product: Array<IProductDetail>) {
    this.products = product;
  }

  filterType(category: any) {
    this.items = this.products.filter((elem: IProductDetail) => {
      return elem.type === category;
    })
  }


  getNameClient() {
    this.client = this.nameClient.value
    this.nameClient.reset()
  }

  addProduct(item: any) {
    const modelProduct = {
      qty: 1,
      product: {
        name: item.name,
        id: item._id,
        price: item.price
      }
    }
    if (this.productItem) {
      let productExist = this.productItem
        .find(product => item._id === product.product.id)
      if (!productExist) {
        this.productItem.push(modelProduct)
      }
    }
    this.getTotal()
  }



  decreaseOneItem(item: OrderProductModel) {
    this.productItem = this.productItem.map((el) => {
      if (el.product.id === item.product.id && el.qty > 1) {
        el.qty--
      }
      return el
    })
    this.getTotal()
  }
  increaseOneItem(item: OrderProductModel) {
    this.productItem = this.productItem.map((el) => {
      if (el.product.id === item.product.id) {
        el.qty++
      } else if (el.product.id === item.product.id && el.qty <= 1) {
        let index = this.productItem.indexOf(item)
        this.productItem.splice(index, 1)
      }
      return el
    })
    this.getTotal()
  }
  deleteItem(item: OrderProductModel) {
    let index = this.productItem.indexOf(item)
    this.productItem.splice(index, 1)
    this.getTotal()
  }

  getTotal() {
    this.total = this.productItem
      .map(item => item.qty * item.product.price)
      .reduce((acc, item) => acc += item, 0)
    if (this.total > 0) {
      this.showButton = true
    }
    else {
      this.showButton = false
    }
  }

  newOrder(client: any) {
    const token: any = localStorage.getItem('token')
    const user: any = jwtDecode(token)
    this.getNameClient();
    const order = {
      status: "pending",
      userId: user.uid,
      client: this.client,
      products: this.productItem.map((item) => ({
        productId: item.product.id,
        qty: item.qty,
      })),
    }
    this.orderService.newOrder(order)
      .pipe(
        catchError((error) => {
          if (error) {
            console.log('Ooops algo salio mal, intente de nuevo')
          }
          return throwError(error)
        })
      )
      .subscribe((response) => {
        this.productItem = [];
        client = client.value;
        this.getTotal()
        console.log(order)
      })
  }



  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faTrashAlt = faTrashAlt;
}
