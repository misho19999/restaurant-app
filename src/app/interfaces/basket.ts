import { Product } from './product';

export interface Basket {
  quantity: number;
  price: number;
  productId: number;

  product?: Product;
}
