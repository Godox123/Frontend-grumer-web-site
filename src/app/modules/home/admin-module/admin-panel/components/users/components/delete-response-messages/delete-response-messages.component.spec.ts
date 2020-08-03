import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResponseMessagesComponent } from './delete-response-messages.component';

describe('DeleteResponseMessagesComponent', () => {
  let component: DeleteResponseMessagesComponent;
  let fixture: ComponentFixture<DeleteResponseMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteResponseMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteResponseMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
