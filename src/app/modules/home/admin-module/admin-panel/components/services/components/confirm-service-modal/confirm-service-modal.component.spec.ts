import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmServiceModalComponent } from './confirm-service-modal.component';

describe('ConfirmServiceModalComponent', () => {
  let component: ConfirmServiceModalComponent;
  let fixture: ComponentFixture<ConfirmServiceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmServiceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
