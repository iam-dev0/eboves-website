import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeaturesComponent } from './product-features.component';

describe('ProductFeaturesComponent', () => {
  let component: ProductFeaturesComponent;
  let fixture: ComponentFixture<ProductFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
