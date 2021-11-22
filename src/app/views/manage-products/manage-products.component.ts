import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IProductDetail } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products: Array<IProductDetail>;
  show: boolean;
  p: number = 1;
  product!: Object;
  myModalEdit = false;
  arrayProduct: Object = {
    _id: '',
    name: '',
    price: 0,
    image: '',
    type: ''
  }

  constructor(private productService: ProductService, private router: Router) {
    this.products = [];
    this.show = false;
  }

  ngOnInit(): void {
    this.showProducts();
  }

  showProducts(){
    this.productService.getProducts().subscribe(
      (response: any) => {
        console.log(response);
        this.allProducts(response);
      }
    )
  }
  allProducts(product: Array<IProductDetail>){
    this.products = product;
  }

  deleteProduct(id: any){
    this.removeItem(id)
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        this.arrayProduct = response
        this.showProducts();
      }
    )
  }

  removeItem(id: any){
    let objIndex = this.products.findIndex(((obj: any) => {
      obj._id === id;
    }));
    if(objIndex != -1){
      this.products.splice(objIndex, 1)
    }
  }

  showEdit(currentProduct: Object){
    this.product = currentProduct;
    this.myModalEdit = true;
  }
  closeEdit( e: boolean){
    this.myModalEdit = e;
  }
  getProduct(){
    this.show = true;
  }

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

}
