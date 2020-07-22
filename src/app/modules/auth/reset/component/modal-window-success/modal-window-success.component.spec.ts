import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowSuccessComponent } from './modal-window-success.component';

describe('ModalWindowSuccessComponent', () => {
  let component: ModalWindowSuccessComponent;
  let fixture: ComponentFixture<ModalWindowSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWindowSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWindowSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
