import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UsersState } from 'src/app/core/state/reducers/users.reducer';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';
import { usersInformation } from 'src/app/core/state/selectors/users.selectors';
import { MatDialog } from '@angular/material';
import { UserDeleteConfirmationComponent } from './components/user-delete-confirmation/user-delete-confirmation.component';
import { UsersActions } from 'src/app/core/state/actions/users.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]> = this.store$.pipe(
    select(usersInformation)
  );

  constructor(private store$: Store<UsersState>, public dialog: MatDialog) {}

  public openDialog(id: string): void {
    const dialogRef = this.dialog.open(UserDeleteConfirmationComponent, {
      data: {
        userId: id
      }
    });
  }

  public ngOnInit(): void {
    this.store$.dispatch(UsersActions.getUsersAction());
  }
}
