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

  public imgsrc: File = this.data.photoUrl;

  private fileToUpload: File = null;

  constructor(
    private store$: Store<ServicesState>,
    private dialogRef: MatDialogRef<UpdateServiceComponent>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userId: string;
      servicename: string;
      description: string;
      price: string;
      photoUrl: File;
    }
  ) {}

  public openDialog(): void {
    this.dialog.open(ConfirmServiceModalComponent);
  }
  public updateService(): void {
    let {
      servicename,
      photoUrl,
      price,
      description
    } = this.updateServiceForm.value;
    const id: string = this.data.userId;

    this.store$.dispatch(
      ServicesActions.updateServiceAction({
        id,
        servicename,
        photoUrl,
        price,
        description
      })
    );
    this.openDialog();
  }

  public selectImg(file: File): void {
    this.fileToUpload = file[0];
    this.updateServiceForm.patchValue({
      photoUrl: file[0]
    });
    this.updateServiceForm.get('photoUrl').updateValueAndValidity();
    let reader = new FileReader();
    reader.onload = (event: any): void => {
      this.imgsrc = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  public ngOnInit(): void {
    this.updateServiceForm = this.fb.group({
      servicename: [this.data.servicename, [Validators.required]],
      photoUrl: [this.data.photoUrl],
      price: [this.data.price, [Validators.required]],
      description: [this.data.description, [Validators.required]]
    });
  }
}
