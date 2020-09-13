import { Product } from './product.model';

export interface Tab {
  id: number;
  name: string;
  products: Product[];
}
