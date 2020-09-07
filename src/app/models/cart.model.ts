import { CartItem } from '@models/cart-item.model';

export interface Cart {
  items: CartItem[];
  total: number;
}
