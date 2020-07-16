import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMiddleComponent } from './header-middle.component';

describe('HeaderMiddleComponent', () => {
  let component: HeaderMiddleComponent;
  let fixture: ComponentFixture<HeaderMiddleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMiddleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
