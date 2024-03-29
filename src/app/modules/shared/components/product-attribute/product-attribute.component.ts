import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ProductAttribute } from '@models/product-attribute.model';
import { AttributeValue } from '@models/attribute-value.model';
import { ProductService } from '@services/product.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrls: ['./product-attribute.component.scss'],
})
export class ProductAttributeComponent implements OnInit, OnDestroy {
  @Output() onChange = new EventEmitter<ProductAttribute>();
  @Input() attribute: ProductAttribute;
  @Input() values: AttributeValue[];
  selectedValue: AttributeValue;
  private subscriptions = new SubSink();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscriptions.sink = this.productService
      .getSelectedVariation()
      .subscribe(({ attributes }) => {
        this.selectedValue = attributes.find(
          ({ id, name, type }) =>
            id === this.attribute.id &&
            name === this.attribute.name &&
            type === this.attribute.type
        )?.value;
      });
  }

  isActive(value: AttributeValue): boolean {
    if (this.selectedValue) {
      return (
        value.id === this.selectedValue.id &&
        value.value === this.selectedValue.value
      );
    }
    return false;
  }

  updateSelectedImageValue(value: AttributeValue) {
    this.onChange.emit({
      ...this.attribute,
      value,
    });
  }

  updateSelectedTextValue(value: string) {
    const attributeValue = this.values.find((v) => v.value === value);
    if (attributeValue) {
      this.onChange.emit({
        ...this.attribute,
        value: attributeValue,
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
