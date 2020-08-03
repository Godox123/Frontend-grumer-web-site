import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetReservationModalComponent } from './set-reservation-modal.component';

describe('SetReservationModalComponent', () => {
  let component: SetReservationModalComponent;
  let fixture: ComponentFixture<SetReservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetReservationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
