import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ServicesState } from 'src/app/core/state/reducers/services.reducer';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ServicesActions } from 'src/app/core/state/actions/services.actions';
import { ConfirmServiceModalComponent } from '../confirm-service-modal/confirm-service-modal.component';

@Component({
  selector: 'app-delete-service',
  templateUrl: './delete-service.component.html',
  styleUrls: ['./delete-service.component.scss']
})
export class DeleteServiceComponent {
  constructor(
    private storeServices$: Store<ServicesState>,

    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userId: string;
    }
  ) {}
  public openDialog(): void {
    this.dialog.open(ConfirmServiceModalComponent);
  }

  public removeService(): void {
    const id = this.data.userId;
    this.storeServices$.dispatch(ServicesActions.deleteServiceAction({ id }));
    this.openDialog();
  }
}
