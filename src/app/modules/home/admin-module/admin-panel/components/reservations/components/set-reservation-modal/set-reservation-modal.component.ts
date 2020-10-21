import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReservationsActions } from 'src/app/core/state/actions/reservation.actions';
import { Store, select } from '@ngrx/store';
import { ReservationsState } from 'src/app/core/state/reducers/reservations.reducer';
import { Observable } from 'rxjs';
import { reservationsTime } from 'src/app/core/state/selectors/reservation.selectors';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ServicesState } from 'src/app/core/state/reducers/services.reducer';
import { Service } from 'src/app/modules/home/models/service.model';
import { services } from 'src/app/core/state/selectors/services.selectors';
import { ConfirmationMessagesComponent } from '../confirmation-messages/confirmation-messages.component';

@Component({
  selector: 'app-set-reservation-modal',
  templateUrl: './set-reservation-modal.component.html',
  styleUrls: ['./set-reservation-modal.component.scss']
})
export class SetReservationModalComponent implements OnInit {
  public setReservationForm: FormGroup;

  public services$: Observable<Service[]> = this.storeServices$.pipe(
    select(services)
  );

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
    private storeServices$: Store<ServicesState>,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<SetReservationModalComponent>,
    private fb: FormBuilder,
    private store$: Store<ReservationsState>
  ) {}

  public selectedServiceCheckMethod(service: Service): void {
    this.setReservationForm.patchValue({ price: service.price });
    this.selectedServiceCheck = true;
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
    console.log(arr.length);
    a();
    b();
    c();
    v();
  }

  public openDialog(): void {
    this.dialog.open(ConfirmationMessagesComponent);
  }

  public setReservation(): void {
    const {
      email,
      username,
      phone,
      selectDate,
      selectTime,
      price,
      selectService,
      photoUrl
    } = this.setReservationForm.value;
    this.store$.dispatch(
      ReservationsActions.setReservationAction({
        email,
        username,
        phone,
        price,
        selectDate,
        selectTime,
        selectService,
        photoUrl
      })
    );
    this.openDialog();
  }
  public onNoClick(): void {
    this.selectedServiceCheck = false;
    this.dialogRef.close();
  }
  public checkReservationDate(): void {
    let { selectDate, selectService } = this.setReservationForm.value;
    this.store$.dispatch(
      ReservationsActions.getSelectedDateAction({ selectDate, selectService })
    );
    let arr: number[];
    this.reservationTime.subscribe((res: number[]): number[] => {
      return (arr = res);
    });
    this.checkTime(arr);
  }

  public ngOnInit(): void {
    this.setReservationForm = this.fb.group({
      email: [null, [Validators.email]],
      username: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern('[0-9]{9}')]],
      price: null,
      selectDate: [null, [Validators.required]],
      selectTime: [null, [Validators.required]],
      selectService: [null, [Validators.required]]
    });
  }
}
