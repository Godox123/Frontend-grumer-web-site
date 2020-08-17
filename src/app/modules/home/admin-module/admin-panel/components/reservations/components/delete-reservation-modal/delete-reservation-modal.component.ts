import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReservationsState } from 'src/app/core/state/reducers/reservations.reducer';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ReservationsActions } from 'src/app/core/state/actions/reservation.actions';
import { ConfirmationMessagesComponent } from '../confirmation-messages/confirmation-messages.component';

@Component({
  selector: 'app-delete-reservation-modal',
  templateUrl: './delete-reservation-modal.component.html',
  styleUrls: ['./delete-reservation-modal.component.scss']
})
export class DeleteReservationModalComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private store$: Store<ReservationsState>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }
  ) {}

  public openDialog(): void {
    this.dialog.open(ConfirmationMessagesComponent);
  }

  public removeUser(): void {
    const id = this.data.userId;
    this.store$.dispatch(ReservationsActions.deleteReservationAction({ id }));
    this.openDialog();
  }

  public ngOnInit(): void {}
}
