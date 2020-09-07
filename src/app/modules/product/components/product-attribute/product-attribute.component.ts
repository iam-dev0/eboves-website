import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductAttribute } from '@models/product-attribute.model';
import { AttributeValue } from '@models/attribute-value.model';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrls: ['./product-attribute.component.scss'],
})
export class ProductAttributeComponent implements OnInit {
  @Output() onChange = new EventEmitter<ProductAttribute>();
  @Input() attribute: ProductAttribute;
  @Input() values: AttributeValue[];
  private selectedValue: AttributeValue;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getSelectedVariation().subscribe(({ attributes }) => {
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

  updateSelectedValue(value: AttributeValue) {
    this.selectedValue = value;
    this.onChange.emit({
      ...this.attribute,
      value,
    });
  }
}
