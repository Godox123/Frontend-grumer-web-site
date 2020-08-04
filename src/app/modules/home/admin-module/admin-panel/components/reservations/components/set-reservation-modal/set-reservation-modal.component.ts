import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReservationsActions } from 'src/app/core/state/actions/reservation.actions';
import { Store } from '@ngrx/store';
import { ReservationsState } from 'src/app/core/state/reducers/reservations.reducer';

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

  constructor(
    private fb: FormBuilder,
    private store$: Store<ReservationsState>
  ) {}

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
