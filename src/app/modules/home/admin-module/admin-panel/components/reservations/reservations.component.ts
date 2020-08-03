import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ReservationsState } from 'src/app/core/state/reducers/reservations.reducer';
import { ReservationsActions } from 'src/app/core/state/actions/reservation.actions';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/modules/home/models/reservation.model';
import { reservationsInformation } from 'src/app/core/state/selectors/reservation.selectors';
import { MatDialog } from '@angular/material';
import { DeleteReservationModalComponent } from './components/delete-reservation-modal/delete-reservation-modal.component';
import { UpdateReservationModalComponent } from './components/update-reservation-modal/update-reservation-modal.component';
import { SetReservationModalComponent } from './components/set-reservation-modal/set-reservation-modal.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  public reservations$: Observable<Reservation[]> = this.store$.pipe(
    select(reservationsInformation)
  );

  constructor(
    private store$: Store<ReservationsState>,
    public dialog: MatDialog
  ) {}

  public openDeleteDialog(id: string): void {
    this.dialog.open(DeleteReservationModalComponent, {
      data: {
        userId: id
      }
    });
  }
  public openUpdateDialog(id: string, service: string): void {
    this.dialog.open(UpdateReservationModalComponent, {
      data: {
        userId: id,
        selectedService: service
      }
    });
  }
  public openAddReservationDialog(): void {
    this.dialog.open(SetReservationModalComponent);
  }

  public ngOnInit(): void {
    this.store$.dispatch(ReservationsActions.getReservationsAction());
  }
}
