import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { ServicesState } from 'src/app/core/state/reducers/services.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmServiceModalComponent } from '../confirm-service-modal/confirm-service-modal.component';
import { ServicesActions } from 'src/app/core/state/actions/services.actions';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  public setServiceForm: FormGroup;

  public imgsrc: string | ArrayBuffer;

  private fileToUpload: File = null;

  constructor(
    private storeServices$: Store<ServicesState>,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddServiceComponent>,
    private fb: FormBuilder
  ) {}

  public openDialog(): void {
    this.dialog.open(ConfirmServiceModalComponent);
  }

  public selectImg(file: File): void {
    this.fileToUpload = file[0];
    this.setServiceForm.patchValue({
      photoUrl: file[0]
    });
    this.setServiceForm.get('photoUrl').updateValueAndValidity();
    let reader = new FileReader();
    reader.onload = (event: any): void => {
      this.imgsrc = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  public setService(): void {
    let {
      servicename,
      photoUrl,
      price,
      description
    } = this.setServiceForm.value;
    this.storeServices$.dispatch(
      ServicesActions.setServiceAction({
        servicename,
        photoUrl,
        price,
        description
      })
    );
    this.openDialog();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.setServiceForm = this.fb.group({
      servicename: [null, [Validators.required]],
      photoUrl: [null],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }
}
