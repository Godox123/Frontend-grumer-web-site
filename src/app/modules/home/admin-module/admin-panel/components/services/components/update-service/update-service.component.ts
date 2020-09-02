import { Component, OnInit, Inject } from '@angular/core';
import { ServicesState } from 'src/app/core/state/reducers/services.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ServicesActions } from 'src/app/core/state/actions/services.actions';
import { ConfirmServiceModalComponent } from '../confirm-service-modal/confirm-service-modal.component';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.scss']
})
export class UpdateServiceComponent implements OnInit {
  public updateServiceForm: FormGroup;
  constructor(
    private store$: Store<ServicesState>,
    private dialogRef: MatDialogRef<UpdateServiceComponent>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userId: string;
    }
  ) {}

  public openDialog(): void {
    this.dialog.open(ConfirmServiceModalComponent);
  }
  public updateService(): void {
    let { servicename, photoUrl, description } = this.updateServiceForm.value;
    const id: string = this.data.userId;

    this.store$.dispatch(
      ServicesActions.updateServiceAction({
        id,
        servicename,
        photoUrl,
        description
      })
    );
    this.openDialog();
  }

  public ngOnInit(): void {
    console.log(this.data.userId);
    this.updateServiceForm = this.fb.group({
      servicename: [null],
      photoUrl: [null],
      description: [null]
    });
  }
}
