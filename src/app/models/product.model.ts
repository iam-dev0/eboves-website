import { ProductVariation } from './product-variation.model';
import { Brand } from './brand.model';
import { Category } from './category.model';
import { ProductAttribute } from './product-attribute.model';

export interface Product {
  id: number;
  name: string;
  slug?: string;
  productCode?: string;
  mainImage: string;
  bestSeller?: boolean;
  featured?: boolean;
  topRated?: boolean;
  rating: number;
  commentsCount: number;
  brand?: Brand;
  variations: ProductVariation[];
  images?: string[];
  category?: Category;
  description?: string;
  additionalInformation?: string;
  metaTitle?: string;
  metDescription?: string;
  metaKeywords?: string;
  attributes?: ProductAttribute[];
}
