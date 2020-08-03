import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReservationModalComponent } from './delete-reservation-modal.component';

describe('DeleteReservationModalComponent', () => {
  let component: DeleteReservationModalComponent;
  let fixture: ComponentFixture<DeleteReservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteReservationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
