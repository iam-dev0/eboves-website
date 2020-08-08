import { ProductVariation } from './product-variation.model';
import { Brand } from './brand.model';
import { Category } from './category.model';

export interface Product {
  id: number;
  name: string;
  slug?: string;
  sku?: string;
  productCode?: string;
  mainImage: string;
  bestSeller: boolean;
  featured: boolean;
  topRated: boolean;
  rating: number;
  commentsCount: number;
  brand?: Brand;
  variations: ProductVariation;
  images?: string[];
  category?: Category;
}
