import { ProductVariation } from '@models/product-variation.model';
export interface CartItem {
  variation: ProductVariation;
  qty: number;
  productName: string;
  productSlug: string;
  variationName: string;
}
