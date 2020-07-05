import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStickyBarComponent } from './product-sticky-bar.component';

describe('ProductStickyBarComponent', () => {
  let component: ProductStickyBarComponent;
  let fixture: ComponentFixture<ProductStickyBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductStickyBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStickyBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
