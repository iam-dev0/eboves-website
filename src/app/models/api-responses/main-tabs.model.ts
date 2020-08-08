import { Product } from '@models/product.model';

export interface MainTabs {
  featured: Product[];
  topRated: Product[];
  onSale: Product[];
}
