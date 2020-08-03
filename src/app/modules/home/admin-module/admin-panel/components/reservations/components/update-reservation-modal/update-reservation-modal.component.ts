import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { ReservationsState } from 'src/app/core/state/reducers/reservations.reducer';
import { ConfirmationMessagesComponent } from '../confirmation-messages/confirmation-messages.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';

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

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private store$: Store<ReservationsState>,
    @Inject(MAT_DIALOG_DATA)
    public data: { userId: string; selectedService: string }
  ) {}
  public openDialog(): void {
    this.dialog.open(ConfirmationMessagesComponent);
  }
  arr = [15];
  a = 9;
  b = 12;
  c = 15;
  checkA() {
    if (this.arr.includes(this.a)) {
      return false;
    }
    return true;
  }
  checkC() {
    if (this.arr.includes(this.c)) {
      return false;
    }
    return true;
  }
  checkB() {
    if (this.arr.includes(this.b)) {
      return false;
    }
    return true;
  }
  test(e) {
    console.log(this.data.selectedService);
    let { selectDate, selectTime } = this.updateReservationForm.value;
    console.log(selectDate.toISOString().slice(0, -14));
    console.log(+selectTime);
  }
  // public onTitleChange(event: Date): void {
  //   let gym: string;
  //   this.selectedGym$.subscribe((res: AdminModel) => (gym = res.gymName));
  //   this.storeAdmin$.dispatch(
  //     new ReservationLoadingForSelectedDateAction(
  //       event.toISOString().slice(0, -14),
  //       gym
  //     )
  //   );
  // }
  public ngOnInit(): void {
    console.log();
    this.updateReservationForm = this.fb.group({
      selectDate: [null, [Validators.required]],
      selectTime: [null, [Validators.required]]
    });
  }
}

// public openDialog(): void {
//   this.dialog.open(ConfirmationMessagesComponent);
// }

// public removeUser(): void {
//   const id = this.data.userId;
//   this.store$.dispatch(ReservationsActions.deleteReservationAction({ id }));
//   this.openDialog();
// }
// public login(): void {
//   const {
//     email,
//     password
//   }: { email: string; password: string } = this.loginForm.value;
//   return this.store$.dispatch(authActions.loginAction({ email, password }));
// }
