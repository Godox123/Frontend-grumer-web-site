import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { ReservationsState } from 'src/app/core/state/reducers/reservations.reducer';
import { ConfirmationMessagesComponent } from '../confirmation-messages/confirmation-messages.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { reservationsTime } from 'src/app/core/state/selectors/reservation.selectors';
import { ReservationsActions } from 'src/app/core/state/actions/reservation.actions';

@Component({
  selector: 'app-update-reservation-modal',
  templateUrl: './update-reservation-modal.component.html',
  styleUrls: ['./update-reservation-modal.component.scss']
})
export class UpdateReservationModalComponent implements OnInit {
  public updateReservationForm: FormGroup;

  public selectedServiceCheck: boolean = false;

  public myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return d >= new Date();
  };

  public reservationTime: Observable<number[]> = this.store$.pipe(
    select(reservationsTime)
  );

  public nine: number = 9;
  public twelve: number = 12;
  public fifteen: number = 15;

  public visibleNine: boolean = true;
  public visibleTwelve: boolean = true;
  public visibleFifteen: boolean = true;

  public visibleReservationTime: boolean = true;
  constructor(
    private dialogRef: MatDialogRef<UpdateReservationModalComponent>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private store$: Store<ReservationsState>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userId: string;
      selectedService: string;
    }
  ) {}

  public openDialog(): void {
    this.dialog.open(ConfirmationMessagesComponent);
  }

  public checkTime(arr: number[]): void {
    const a = (): boolean => {
      if (arr.includes(this.nine)) {
        return (this.visibleNine = false);
      }
    };
    const b = (): boolean => {
      if (arr.includes(this.twelve)) {
        return (this.visibleTwelve = false);
      }
    };

    const c = (): boolean => {
      if (arr.includes(this.fifteen)) {
        return (this.visibleFifteen = false);
      }
    };

    const v = (): boolean => {
      if (arr.length > 3 || arr.length == 3) {
        return (this.visibleReservationTime = false);
      }
    };
    a();
    b();
    c();
    v();
  }

  public onNoClick(): void {
    this.selectedServiceCheck = false;
    this.dialogRef.close();
  }
  public updateReservation(): void {
    let { selectDate, selectTime } = this.updateReservationForm.value;
    const selectService = this.data.selectedService;
    const id: string = this.data.userId;
    console.log(selectDate, selectTime, selectService);
    this.store$.dispatch(
      ReservationsActions.updateReservationAction({
        id,
        selectDate,
        selectTime,
        selectService
      })
    );
    this.openDialog();
  }
  public checkReservationDate(): void {
    let { selectDate } = this.updateReservationForm.value;
    const selectService = this.data.selectedService;
    console.log(selectService);
    this.store$.dispatch(
      ReservationsActions.getSelectedDateAction({ selectDate, selectService })
    );
    let arr: number[];
    this.reservationTime.subscribe((res: number[]): number[] => {
      return (arr = res);
    });
    this.checkTime(arr);
  }

  public selectedServiceCheckMethod(): void {
    console.log(this.selectedServiceCheck);
    this.selectedServiceCheck = true;
  }

  public ngOnInit(): void {
    this.updateReservationForm = this.fb.group({
      selectDate: [null, [Validators.required]],
      selectTime: [null, [Validators.required]]
    });
  }
}
