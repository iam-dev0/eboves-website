import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsSectionComponent } from './deals-section.component';

describe('DealsSectionComponent', () => {
  let component: DealsSectionComponent;
  let fixture: ComponentFixture<DealsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
