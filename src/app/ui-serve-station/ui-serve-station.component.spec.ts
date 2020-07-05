import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiServeStationComponent } from './ui-serve-station.component';

describe('UiServeStationComponent', () => {
  let component: UiServeStationComponent;
  let fixture: ComponentFixture<UiServeStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiServeStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiServeStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
