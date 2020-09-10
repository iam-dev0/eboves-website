import * as moment from 'moment';

import { ProductVariation } from '@models/product-variation.model';
import { Category } from '@models/category.model';
import { Product } from '@models/product.model';
import { PriceRange } from '@models/pricae-range.model';
import { ProductAttribute } from '@models/product-attribute.model';
import { ATTRIBUTE_TYPES } from 'src/constants';

export const getMetaTags = (data): Map<string, string> => {
  const tags: Map<string, string> = new Map<string, string>();
  tags.set('keywords', data?.metaKeywords);
  tags.set('descriptions', data?.metaDescription);
  return tags;
};

export const cloneObject = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const getParts = (products: Product[]): Category[] => {
  const categories = [];
  products.forEach(({ category }) => {
    if (!categories.find(({ slug }) => slug === category.slug))
      categories.push(category);
  });
  return categories;
};

const getTree = (list: Category[]): Category[] => {
  const newList: Category[] = [];

  list.forEach((part) => {
    const item = newList.find(({ slug }) => slug === part.parent.slug);
    if (!item) {
      newList.push({
        ...part.parent,
        childrens: [{ ...part, parent: null }],
      });
    } else {
      item.childrens.push({ ...part, parent: null });
    }
  });

  return newList;
};

export const getCategoryTree = (products: Product[]): Category[] => {
  const parts = getParts(products);

  return getTree(getTree(parts));
};

export const getPriceRange = (product: Product): PriceRange => {
  const min = product.variations?.reduce((accumulator, current, index) => {
    const price = getDiscountedPrice(current);
    if (index === 0) return price;
    return price < accumulator ? price : accumulator;
  }, 0);

  const max = product.variations?.reduce((accumulator, current) => {
    const price = getDiscountedPrice(current);
    return price > accumulator ? price : accumulator;
  }, 0);

  return { min, max };
};

export const getDiscountedPrice = (variation: ProductVariation): number => {
  const { price, discountPercentage } = variation;
  if (!isDiscountAvailable(variation)) return price;
  return price - (discountPercentage * price) / 100;
};

export const isDiscountAvailable = (variation: ProductVariation): boolean => {
  return (
    variation.discountPercentage > 0 &&
    moment().isBetween(variation.discountStartTime, variation.discountEndTime)
  );
};

export const getVariationName = (
  variationAttributes: ProductAttribute[],
  productName: string
): string => {
  return `${productName} (${variationAttributes.reduce(
    (acc, cur, idx) =>
      acc +
      (cur.type === ATTRIBUTE_TYPES.IMAGE ? cur.value.alt : cur.value.value) +
      (idx === variationAttributes.length - 1 ? '' : ' + '),
    ''
  )})`;
};
