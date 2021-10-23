import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProductDetail } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
productData: any;
products: Array<IProductDetail>
public form: FormGroup;
@Input() product: any;
@Output() createProduct: EventEmitter<{}> = new EventEmitter();

id: string = ''
name: string = ''
price: number = 0
image: string = ''
type: string = ''

nameForm = new FormControl('', [Validators.required]);
priceForm = new FormControl('', [Validators.required]);
imageForm = new FormControl('', [Validators.required]);
typeForm = new FormControl('', [Validators.required]);

  constructor(private productService: ProductService, private router: Router) {
    this.productData = {}
    this.products = []
    this.form = new FormGroup({
      name: this.nameForm,
      price: this.priceForm,
      image: this.imageForm,
      type: this.typeForm
    })
    this.product;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const newProduct = {
      name: this.nameForm.value,
      price: this.priceForm.value,
      image: this.imageForm.value,
      type: this.typeForm.value
    }
    this.createProduct.emit(newProduct)
    console.log('product saved', newProduct)

    this.productService.newProduct(newProduct).subscribe(
      (response: any) => {
        this.productData = response;
        console.log(this.productData)
        this.products.push(this.productData)
      }
    )
    this.form.reset()
  }

  btnViewProducts(){
    this.router.navigate(['manageproducts']);
  }
}
