import { Category } from './category';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  vegeterian: boolean;
  nuts: boolean;
  spiciness: number;
  categoryId: number;
}
