import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiServeItemComponent } from './ui-serve-item.component';

describe('UiServeItemComponent', () => {
  let component: UiServeItemComponent;
  let fixture: ComponentFixture<UiServeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiServeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiServeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
