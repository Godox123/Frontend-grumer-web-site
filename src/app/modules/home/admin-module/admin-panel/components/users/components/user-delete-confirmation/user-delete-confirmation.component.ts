import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersState } from 'src/app/core/state/reducers/users.reducer';
import { UsersActions } from 'src/app/core/state/actions/users.actions';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmationMessagesComponent } from '../../../reservations/components/confirmation-messages/confirmation-messages.component';

@Component({
  selector: 'app-user-delete-confirmation',
  templateUrl: './user-delete-confirmation.component.html',
  styleUrls: ['./user-delete-confirmation.component.scss']
})
export class UserDeleteConfirmationComponent {
  constructor(
    public dialog: MatDialog,
    private store$: Store<UsersState>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }
  ) {}

  public openDialog(): void {
    this.dialog.open(ConfirmationMessagesComponent);
  }

  public removeUser(): void {
    const id = this.data.userId;
    this.store$.dispatch(UsersActions.deleteUserAction({ id }));
    this.openDialog();
  }
}
