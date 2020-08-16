export interface Category {
  id: number;
  name: string;
  slug: string;
  childrens?: Category[];
  parent?: Category;
  categoryId?: number;
  image?: string;
  displayOrder?: number;
  storyText?: string;
  storyTextColor?: string;
  storyCover?: string;
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
}
