export interface ProductVariation {
  id: number;
  mainImage: string;
  slug?: string;
  virtualQuantity: number;
  price: string; //TODO: make it a number. change in API
  bestSeller: boolean;
  topRated?: boolean; //TODO: add in API
  featured?: boolean; //TODO: add in API
  discountPercentage: number;
  discountPrice: string; //TODO: make it a number. change in API
  discountStartTime: Date;
  discountEndTime: Date;
  trending: boolean;
  preOrder: boolean;
  attributeValues: [];
  images?: string[];
}
