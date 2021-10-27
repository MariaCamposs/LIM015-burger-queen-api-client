import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faMinusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IProductDetail } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product/product.service';
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

  constructor(private productService: ProductService) {
    this.products = []
    this.items = []
    this.show = false;
    this.showButton = false

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
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faTrashAlt = faTrashAlt;
}
