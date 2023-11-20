import { Component, OnInit } from '@angular/core';
import { BasketsService } from '../services/baskets.service';
import { Basket } from '../interfaces/basket';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  baskets!: Basket[];
  total: number = 0;
  constructor(private basketService: BasketsService) {}

  ngOnInit(): void {
    this.getBasket();
  }

  getBasket() {
    this.basketService.getAllBasket().subscribe((baskets: any) => {
      this.baskets = baskets;
      this.total = 0;
      baskets.forEach((basket: any) => {
        this.total = this.total + basket.price * basket.quantity;
      });
    });
  }

  onProductRemove(id: number | undefined) {
    if (!id) return;
    this.basketService.deleteProduct(id).subscribe((res) => this.getBasket());
  }

  increaseQuantity(product: Product | undefined, quantity: number) {
    if (!product) return;

    this.basketService
      .updateBasket(quantity + 1, product.price, product.id)
      .subscribe((res) => this.getBasket());
  }

  decreaseQuantity(product: Product | undefined, quantity: number) {
    if (!product) return;

    this.basketService
      .updateBasket(quantity - 1, product.price, product.id)
      .subscribe((res) => this.getBasket());
  }
}
