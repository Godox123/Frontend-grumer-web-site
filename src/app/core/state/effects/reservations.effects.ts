import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { Action, Store, select } from '@ngrx/store';
import { ReservationService } from 'src/app/modules/home/services/reservation.service';
import { ReservationsActions } from '../actions/reservation.actions';
import { Reservation } from 'src/app/modules/home/models/reservation.model';
import { ReservationsState } from '../reducers/reservations.reducer';
import { reservationsInformation } from '../selectors/reservation.selectors';

@Injectable()
export class ReservationsEffect {
  constructor(
    private storeReservations$: Store<ReservationsState>,
    private actions$: Actions,
    private reservationService: ReservationService
  ) {}

  private clearReservationTime: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationsActions.clearReservationTimeAction),
      map(() => {
        return ReservationsActions.clearReservationTimeSuccessAction();
      }),
      catchError((errMessage: Error) => {
        return of(
          ReservationsActions.clearReservationTimeFailedAction({ errMessage })
        );
      })
    )
  );

  private getReservationHours: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationsActions.getSelectedDateAction),
      map((action: { selectDate: Date; selectService: string }): {
        selectDate: Date;
        selectService: string;
      } => {
        return {
          selectDate: action.selectDate,
          selectService: action.selectService
        };
      }),
      withLatestFrom(
        this.storeReservations$.pipe(select(reservationsInformation))
      ),
      map(([data, allResaervations]) => {
        const reservationTime: number[] = [];
        allResaervations.forEach((element: Reservation) => {
          if (
            new Date(element.selectDate).getDate() ===
              new Date(data.selectDate).getDate() &&
            element.selectService === data.selectService
          ) {
            reservationTime.push(element.selectTime);
          } else {
            console.log('else');
          }
        });
        return ReservationsActions.getSelectedDateSuccessAction({
          reservationTime
        });
      }),
      catchError((error: Error) => {
        return of(ReservationsActions.getSelectedDateFailedAction({ error }));
      })
    )
  );

  private getReservations: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationsActions.getReservationsAction),
      exhaustMap(() => {
        return this.reservationService.getReservations().pipe(
          map((resp: { body: Reservation[] }) => {
            let reservations = resp.body;
            return ReservationsActions.getReservationsSuccessAction({
              reservations
            });
          }),
          catchError((error: Error) => {
            console.log(error);
            return of(
              ReservationsActions.getReservationsFailedAction({ error })
            );
          })
        );
      })
    )
  );

  private setReservation: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationsActions.setReservationAction),
      exhaustMap(
        (action: {
          email: string;
          username: string;
          phone: number;
          selectDate: Date;
          selectTime: number;
          selectService: string;
          photoUrl: string;
        }) => {
          return this.reservationService
            .setReservation(
              action.email,
              action.username,
              action.phone,
              action.selectDate,
              action.selectTime,
              action.selectService,
              action.photoUrl
            )
            .pipe(
              map((resp: { body: Reservation[] }) => {
                let response = resp.body;
                return ReservationsActions.setReservationSuccessAction({
                  reservations: response,
                  successMessage: 'Бронирование успешно добавлено'
                });
              }),
              catchError((error: Error) => {
                return of(
                  ReservationsActions.setReservationFailedAction({ error })
                );
              })
            );
        }
      )
    )
  );

  private updateReservation: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReservationsActions.updateReservationAction),
      exhaustMap(action => {
        return this.reservationService
          .updateReservation(
            action.id,
            action.selectDate,
            action.selectTime,
            action.selectService
          )
          .pipe(
            map((resp: { body: Reservation[] }) => {
              return ReservationsActions.updateReservationSuccessAction({
                reservations: resp.body,
                message: 'Бронирование  изменено успешно'
              });
            }),
            catchError((error: Error) => {
              return of(
                ReservationsActions.updateReservationFailedAction({ error })
              );
            })
          );
      })
    );
  });

  private deleteReservation: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReservationsActions.deleteReservationAction),
      exhaustMap(action => {
        return this.reservationService.deleteReservation(action.id).pipe(
          map((resp: { body: Reservation[] }) => {
            console.log(resp.body);
            return ReservationsActions.deleteReservationSuccessAction({
              reservations: resp.body,
              message: 'Бронирование удалено успешно'
            });
          }),
          catchError((error: Error) => {
            return of(
              ReservationsActions.deleteReservationFailedAction({ error })
            );
          })
        );
      })
    );
  });
}
