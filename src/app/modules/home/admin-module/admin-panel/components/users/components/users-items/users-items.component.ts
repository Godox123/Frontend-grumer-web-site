import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user.model';
import { UserDeleteConfirmationComponent } from '../user-delete-confirmation/user-delete-confirmation.component';

@Component({
  selector: 'app-users-items',
  templateUrl: './users-items.component.html',
  styleUrls: ['./users-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersItemsComponent {
  @Input() public users: Observable<User[]>;

  constructor(public dialog: MatDialog) {}

  public openDialog(id: string): void {
    this.dialog.open(UserDeleteConfirmationComponent, {
      data: {
        userId: id
      }
    });
  }

  public identify(index: number, item: User): number {
    return item.phone;
  }
}
