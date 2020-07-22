import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowFailedComponent } from './modal-window-failed.component';

describe('ModalWindowFailedComponent', () => {
  let component: ModalWindowFailedComponent;
  let fixture: ComponentFixture<ModalWindowFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWindowFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWindowFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
