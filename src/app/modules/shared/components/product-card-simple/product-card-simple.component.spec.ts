import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardSimpleComponent } from './product-card-simple.component';

describe('ProductCardSimpleComponent', () => {
  let component: ProductCardSimpleComponent;
  let fixture: ComponentFixture<ProductCardSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
