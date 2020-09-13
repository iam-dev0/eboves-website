import { ProductAttribute } from './product-attribute.model';
export interface ProductVariation {
  id: number;
  mainImage: string;
  mainBarcode?: string;
  slug?: string;
  availableQuantity: number;
  sku: string;
  price: number;
  bestSeller: boolean;
  topRated?: boolean;
  featured?: boolean;
  discountPercentage: number;
  discountPrice: number;
  discountStartTime: Date;
  discountEndTime: Date;
  discountType: string;
  discountReason: string;
  trending?: boolean;
  preOrder?: boolean;
  attributes: ProductAttribute[];
  images?: string[];
  shortDescription?: string;
}
