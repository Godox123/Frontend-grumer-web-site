import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReservationModalComponent } from './update-reservation-modal.component';

describe('UpdateReservationModalComponent', () => {
  let component: UpdateReservationModalComponent;
  let fixture: ComponentFixture<UpdateReservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateReservationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
