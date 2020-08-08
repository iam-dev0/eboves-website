export interface Category {
  id: number;
  name: string;
  slug?: string;
  parent?: Category;
}
