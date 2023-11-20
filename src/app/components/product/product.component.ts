import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCartClicked = new EventEmitter<Product>();

  onAddToCart() {
    this.addToCartClicked.emit(this.product);
  }
}
