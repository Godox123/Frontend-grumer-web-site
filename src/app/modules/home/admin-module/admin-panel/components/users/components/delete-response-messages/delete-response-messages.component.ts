import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UsersState } from 'src/app/core/state/reducers/users.reducer';
import { Observable } from 'rxjs';
import {
  userDeleteSuccessMessage,
  userDeleteFailedMessage
} from 'src/app/core/state/selectors/users.selectors';

@Component({
  selector: 'app-delete-response-messages',
  templateUrl: './delete-response-messages.component.html',
  styleUrls: ['./delete-response-messages.component.scss']
})
export class DeleteResponseMessagesComponent {
  public successMessage$: Observable<string> = this.store$.pipe(
    select(userDeleteSuccessMessage)
  );

  public failedMessage$: Observable<Error> = this.store$.pipe(
    select(userDeleteFailedMessage)
  );

  constructor(private store$: Store<UsersState>) {}
}
