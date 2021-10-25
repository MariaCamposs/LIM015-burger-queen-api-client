import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {

  errorMessage: string = '';
  @Input() editProduct: boolean = false;
  @Input()  product: any;
  @Output() close: EventEmitter<boolean> = new EventEmitter;
  @Output() show: EventEmitter<{}> = new EventEmitter;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.close.emit(false);
  }

  showProducts(){
    this.show.emit();
  }

  updateProduct(name: string, price: string, image: string, type: string){
    if(name === '' || price === '0' || image === '' || type === ''){
      this.errorMessage = 'Ingrese datos en alguno de los campos';
    } else {
      const productUpdate = {
        name,
        price: parseFloat(price),
        image,
        type
      }
      this.productService.updateProduct(this.product._id, productUpdate).subscribe(() => {
        this.closeModal();
        this.showProducts();
      })
    }
  }
}
