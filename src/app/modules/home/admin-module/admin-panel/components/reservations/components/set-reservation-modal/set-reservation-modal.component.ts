import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReservationsActions } from 'src/app/core/state/actions/reservation.actions';
import { Store, select } from '@ngrx/store';
import { ReservationsState } from 'src/app/core/state/reducers/reservations.reducer';
import { Observable } from 'rxjs';
import { reservationsTime } from 'src/app/core/state/selectors/reservation.selectors';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-set-reservation-modal',
  templateUrl: './set-reservation-modal.component.html',
  styleUrls: ['./set-reservation-modal.component.scss']
})
export class SetReservationModalComponent implements OnInit {
  public setReservationForm: FormGroup;

  public myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return d >= new Date();
  };

  public reservationTime: Observable<number[]> = this.store$.pipe(
    select(reservationsTime)
  );
  public visible: boolean = true;
  public visibleNine: boolean = true;
  public visibleTwelve: boolean = true;
  public visibleFifteen: boolean = true;

  public nine: number = 9;
  public twelve: number = 12;
  public fifteen: number = 15;

  constructor(
    public dialogRef: MatDialogRef<SetReservationModalComponent>,
    private fb: FormBuilder,
    private store$: Store<ReservationsState>
  ) {}

  public close() {
    this.dialogRef.close();
  }

  public checkTime(arr: number[]): void {
    const nine = (): boolean => {
      if (arr.includes(this.nine)) {
        return (this.visibleNine = false);
      }
    };
    const twelve = (): boolean => {
      if (arr.includes(this.twelve)) {
        return (this.visibleTwelve = false);
      }
    };
    const fifteen = (): boolean => {
      if (arr.includes(this.fifteen)) {
        return (this.visibleFifteen = false);
      }
    };
    const visible = (): boolean => {
      if (arr.length === 3) {
        return (this.visible = false);
      }
    };
    nine();
    twelve();
    fifteen();
    visible();
  }

  public selectDate(): void {
    let { selectDate, selectService } = this.setReservationForm.value;
    this.store$.dispatch(
      ReservationsActions.getSelectedDateAction({ selectDate, selectService })
    );
    let arr: number[] = [];
    this.reservationTime.subscribe((res: number[]): number[] => (arr = res));

    this.checkTime(arr);
  }

  public serReservation(): void {
    const {
      email,
      username,
      phone,
      selectDate,
      selectTime,
      selectService
    } = this.setReservationForm.value;
    console.log(selectDate);
    this.store$.dispatch(
      ReservationsActions.setReservationAction({
        email,
        username,
        phone,
        selectDate,
        selectTime,
        selectService
      })
    );
  }

  public ngOnInit(): void {
    this.setReservationForm = this.fb.group({
      email: [null, [Validators.email]],
      username: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern('[0-9]{9}')]],
      selectDate: [null, [Validators.required]],
      selectTime: [null, [Validators.required]],
      selectService: [null, [Validators.required]]
    });
  }
}
