import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardVertActionsComponent } from './product-card-vert-actions.component';

describe('ProductCardVertActionsComponent', () => {
  let component: ProductCardVertActionsComponent;
  let fixture: ComponentFixture<ProductCardVertActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardVertActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardVertActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
