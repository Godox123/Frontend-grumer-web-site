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

  public visible: boolean = true;
  public visibleNine: boolean = true;
  public visibleTwelve: boolean = true;
  public visibleFifteen: boolean = true;

  public nine: number = 9;
  public twelve: number = 12;
  public fifteen: number = 15;
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
    let { selectDate } = this.updateReservationForm.value;
    let selectService: string = this.data.selectedService;
    this.store$.dispatch(
      ReservationsActions.getSelectedDateAction({ selectDate, selectService })
    );
    let arr: number[] = [];
    this.reservationTime.subscribe((res: number[]): number[] => (arr = res));

    this.checkTime(arr);
  }

  public ngOnInit(): void {
    this.updateReservationForm = this.fb.group({
      selectDate: [null, [Validators.required]],
      selectTime: [null, [Validators.required]]
    });
  }
}
