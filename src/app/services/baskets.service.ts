import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from '../interfaces/basket';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BasketsService {
  constructor(private httpClient: HttpClient) {}

  getAllBasket() {
    return this.httpClient.get(`${environment.basketsApi}/GetAll`);
  }

  updateBasket(quantity: number, price: number, productId: number) {
    return this.httpClient.put(`${environment.basketsApi}/UpdateBasket`, {
      quantity,
      price,
      productId,
    });
  }

  addToBasket(quantity: number, price: number, productId: number) {
    return this.httpClient.post(`${environment.basketsApi}/AddToBasket`, {
      quantity,
      price,
      productId,
    });
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(
      `${environment.basketsApi}/DeleteProduct/${id}`
    );
  }
}
