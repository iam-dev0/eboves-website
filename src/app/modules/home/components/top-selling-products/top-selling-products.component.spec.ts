import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSellingProductsComponent } from './top-selling-products.component';

describe('TopSellingProductsComponent', () => {
  let component: TopSellingProductsComponent;
  let fixture: ComponentFixture<TopSellingProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSellingProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSellingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
