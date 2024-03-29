export interface Brand {
  id: number;
  name: string;
  active?: boolean;
  featured?: boolean;
  logo?: string;
  image?: string;
  slug?: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
}
