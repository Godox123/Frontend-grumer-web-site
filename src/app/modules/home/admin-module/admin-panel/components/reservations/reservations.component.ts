import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnInit
} from '@angular/core';
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
import { ServicesState } from 'src/app/core/state/reducers/services.reducer';
import { ServicesActions } from 'src/app/core/state/actions/services.actions';
import { SharedState } from 'src/app/core/state/reducers/shared.reducer';
import { windowWidth } from 'src/app/core/state/selectors/shared.selectors';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationsComponent implements OnInit, DoCheck {
  public reservations$: Observable<Reservation[]> = this.store$.pipe(
    select(reservationsInformation)
  );

  public windowWidth$: Observable<boolean> = this.sharedStore$.pipe(
    select(windowWidth)
  );

  public displayedColumns: string[] = [
    'email',
    'username',
    'phone',
    'selectDate',
    'selectTime',
    'selectService',
    'price',
    'actionUpdate',
    'actionDelete'
  ];

  constructor(
    private sharedStore$: Store<SharedState>,
    private storeServices$: Store<ServicesState>,
    private store$: Store<ReservationsState>,
    public dialog: MatDialog
  ) {}

  public identify(index: number, item: Reservation): number {
    return item.phone;
  }

  public openDeleteDialog(id: string): void {
    this.dialog.open(DeleteReservationModalComponent, {
      data: {
        userId: id
      }
    });
  }
  public openUpdateDialog(id: string, service: string): void {
    const dialogRef = this.dialog.open(UpdateReservationModalComponent, {
      data: {
        userId: id,
        selectedService: service
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store$.dispatch(ReservationsActions.clearReservationTimeAction());
    });
  }

  public openAddReservationDialog(): void {
    const dialogRef = this.dialog.open(SetReservationModalComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.store$.dispatch(ReservationsActions.clearReservationTimeAction());
    });
  }

  public ngDoCheck(): void {
    this.reservations$.subscribe((reservations: Reservation[]) => {
      if (reservations) {
        reservations.forEach((reservation: Reservation): void => {
          if (
            new Date(reservation.selectDate).getTime() < new Date().getTime()
          ) {
            if (reservation.selectTime < new Date().getHours()) {
              console.log(reservation);
              this.store$.dispatch(
                ReservationsActions.deleteReservationAction({
                  id: reservation[`_id`]
                })
              );
            }
          }
        });
      }
    });
  }

  public ngOnInit(): void {
    this.store$.dispatch(ReservationsActions.getReservationsAction());
    this.storeServices$.dispatch(ServicesActions.getServicesAction());
  }
}

// this.reservations$.subscribe((reservations: Reservation[]) => {
//   if (reservations) {
//     reservations.forEach(reservation => {
//       if (
//         new Date(reservation.selectDate).getTime() < new Date().getTime()
//       ) {
//         if (reservation.selectTime < new Date().getHours()) {
//           this.store$.dispatch(
//             ReservationsActions.deleteReservationAction({
//               id: reservation[`_id`]
//             })
//           );
//         }
//       }
//     });
//   }
// });

// reservations.forEach(reservation => {
//   if (new Date(reservation.selectDate).getTime() < new Date().getTime()) {
//     if (reservation.selectTime < new Date().getHours()) {
//       Reservation.findOneAndDelete({
//         _id: reservation._id,
//       });
//     }
//   }
// });
