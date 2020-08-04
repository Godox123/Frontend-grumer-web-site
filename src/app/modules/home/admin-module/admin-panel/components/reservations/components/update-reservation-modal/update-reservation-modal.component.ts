import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { ReservationsState } from 'src/app/core/state/reducers/reservations.reducer';
import { ConfirmationMessagesComponent } from '../confirmation-messages/confirmation-messages.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { element } from 'protractor';
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

  public myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return d >= new Date();
  };

  public reservationTime: Observable<number[]> = this.store$.pipe(
    select(reservationsTime)
  );
  visibleA: boolean = true;
  visibleB: boolean = true;
  visibleC: boolean = true;
  A(arr) {
    if (arr.includes(this.a)) {
      return (this.visibleA = false);
    }
    if (arr.includes(this.b)) {
      this.visibleB = false;
    }
    if (arr.includes(this.c)) {
      this.visibleC = false;
    }
    return true;
  }

  public a: number = 9;
  public b: number = 12;
  public c: number = 15;
  constructor(
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

  test(e) {
    let { selectDate } = this.updateReservationForm.value;
    let selectService = this.data.selectedService;
    this.store$.dispatch(
      ReservationsActions.getSelectedDateAction({ selectDate, selectService })
    );
    let arr = [];
    this.reservationTime.subscribe(res => (arr = res));

    this.A(arr);

    console.log(selectDate);
  }

  public ngOnInit(): void {
    this.updateReservationForm = this.fb.group({
      selectDate: [null, [Validators.required]],
      selectTime: [null, [Validators.required]]
    });
  }
}
