import { Action } from '@ngrx/store';
import { Product } from '../../models/product.model';
import * as ProductActions from '../actions/product.actions';

const initState = {
  id: 0,
  name: '',
  images: [],
  price: 0,
  category: '',
  tag: '',
  oldPrice: 0,
};

export function productReducer(
  state: Product[] = [],
  action: ProductActions.Actions
) {
  switch (action.type) {
    case ProductActions.ADD_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
}
