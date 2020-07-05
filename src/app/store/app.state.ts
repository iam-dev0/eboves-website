import { Product } from '../models/product.model';

export interface AppState {
  readonly type: Product[];
}
