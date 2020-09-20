import { AttributeValue } from './attribute-value.model';

export interface ProductAttribute {
  id: number;
  name: string;
  type: string;
  unit?: string;
  value?: AttributeValue;
  attributeValues?: AttributeValue[];
}
