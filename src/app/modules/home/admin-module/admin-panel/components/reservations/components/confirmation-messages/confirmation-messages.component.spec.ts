import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationMessagesComponent } from './confirmation-messages.component';

describe('ConfirmationMessagesComponent', () => {
  let component: ConfirmationMessagesComponent;
  let fixture: ComponentFixture<ConfirmationMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
