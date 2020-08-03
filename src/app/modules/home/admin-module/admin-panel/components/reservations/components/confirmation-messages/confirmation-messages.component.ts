import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ReservationsState } from 'src/app/core/state/reducers/reservations.reducer';
import { Observable } from 'rxjs';
import {
  reservationsSuccessMessage,
  reservationsFailedMessage
} from 'src/app/core/state/selectors/reservation.selectors';

@Component({
  selector: 'app-confirmation-messages',
  templateUrl: './confirmation-messages.component.html',
  styleUrls: ['./confirmation-messages.component.scss']
})
export class ConfirmationMessagesComponent implements OnInit {
  public successMessage$: Observable<string> = this.store$.pipe(
    select(reservationsSuccessMessage)
  );

  public failedMessage$: Observable<Error> = this.store$.pipe(
    select(reservationsFailedMessage)
  );

  constructor(private store$: Store<ReservationsState>) {}

  ngOnInit() {}
}
