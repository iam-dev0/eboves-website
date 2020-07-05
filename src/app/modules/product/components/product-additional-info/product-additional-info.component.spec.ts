import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdditionalInfoComponent } from './product-additional-info.component';

describe('ProductAdditionalInfoComponent', () => {
  let component: ProductAdditionalInfoComponent;
  let fixture: ComponentFixture<ProductAdditionalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAdditionalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
