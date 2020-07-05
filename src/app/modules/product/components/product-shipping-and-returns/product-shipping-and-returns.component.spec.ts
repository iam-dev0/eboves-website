import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShippingAndReturnsComponent } from './product-shipping-and-returns.component';

describe('ProductShippingAndReturnsComponent', () => {
  let component: ProductShippingAndReturnsComponent;
  let fixture: ComponentFixture<ProductShippingAndReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductShippingAndReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShippingAndReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
