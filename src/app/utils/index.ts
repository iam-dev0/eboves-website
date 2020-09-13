import { AttributeValue } from '@models/attribute-value.model';
import * as moment from 'moment';

import { ProductVariation } from '@models/product-variation.model';
import { Category } from '@models/category.model';
import { Product } from '@models/product.model';
import { PriceRange } from '@models/pricae-range.model';
import { FilterOptions } from '@models/filter-options.model';
import { ProductAttribute } from '@models/product-attribute.model';

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
    if (index === 0) return current.price;
    return current.price < accumulator ? current.price : accumulator;
  }, 0);

  const max = product.variations?.reduce(
    (accumulator, current) =>
      current.price > accumulator ? current.price : accumulator,
    0
  );

  return { min, max };
};

export const isDiscountAvailable = (variation: ProductVariation): boolean => {
  return (
    variation.discountPrice > 0 &&
    moment().isBetween(variation.discountStartTime, variation.discountEndTime)
  );
};

export const filterProducts = (
  products: Product[],
  options: FilterOptions
): Product[] => {
  const { catSlug = '', subCatSlug = '', partSlug = '' } = options;
  if (partSlug) {
    return products.filter(({ category: { slug } }) => slug === partSlug);
  }
  if (subCatSlug) {
    return products.filter(
      ({
        category: {
          parent: { slug },
        },
      }) => slug === subCatSlug
    );
  }
  if (catSlug) {
    return products.filter(
      ({
        category: {
          parent: {
            parent: { slug },
          },
        },
      }) => slug === catSlug
    );
  }
  return products;
};

export const getAttributesWithValues = (
  product: Product
): ProductAttribute[] => {
  return product.attributes?.map((attribute) => {
    return {
      ...attribute,
      attributeValues: getAttributeValues(product.variations, attribute),
    };
  });
};

const getAttributeValues = (
  variations: ProductVariation[],
  attribute: ProductAttribute
): AttributeValue[] => {
  const values: AttributeValue[] = [];
  variations.forEach(({ attributes }) => {
    attributes.forEach(({ id, name, type, value: attributeValue }) => {
      if (
        id === attribute.id &&
        name === attribute.name &&
        type === attribute.type
      ) {
        if (!values.find(({ value }) => value === attributeValue.value))
          values.push(attributeValue);
      }
    });
  });
  return values;
};
