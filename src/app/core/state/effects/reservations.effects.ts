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
        console.log(data, allResaervations);
        const reservationTime: number[] = [];

        allResaervations.forEach((element: Reservation) => {
          if (
            element.selectDate === data.selectDate &&
            element.selectService === data.selectService
          ) {
            reservationTime.push(element.selectTime);
          }
        });
        return ReservationsActions.getSelectedDateSuccessAction({
          reservationTime
        });
      })
    )
  );

  //   private getReservations: Observable<Action> = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ReservationsActions.getReservationsAction),
  //     exhaustMap(() => {
  //       return this.reservationService.getReservations().pipe(
  //         map((resp: { body: Reservation[] }) => {
  //           let reservations = resp.body;
  //           console.log(reservations);
  //           return ReservationsActions.getReservationsSuccessAction({
  //             reservations
  //           });
  //         }),
  //         catchError((error: Error) => {
  //           console.log(error);
  //           return of(
  //             ReservationsActions.getReservationsFailedAction({ error })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );

  // @Effect()
  // public gettingInfromation: Observable<Action> = this.actions$.pipe(
  //   ofType(UserStateActions.GettingSelectedReservationAction),
  //   map((data: GettingSelectedReservationAction) => data.payload),
  //   withLatestFrom(
  //     this.storeUser$.pipe(select(selectUsersReservationStateEvents))
  //   ),
  //   map(([data, allReservations]) => {
  //     const result: number[] = [];
  //     allReservations.forEach((elem: UserModel) => {
  //       if (
  //         elem.reservationDate === data.reservationDate &&
  //         elem.gymName === data.gymName &&
  //         elem.email !== data.email
  //       ) {
  //         const from = elem.initialTime;
  //         let to = elem.endTime;
  //         while (to >= from) {
  //           result.push(to);
  //           to = to - 1;
  //         }
  //       }
  //     });
  //     return new GettingSelectedReservationSuccessAction(result);
  //   }),
  //   catchError(
  //     (error: Error, caught: Observable<Action>): Observable<Action> => {
  //       this.store$.dispatch(new GettingSelectedReservationFailedAction(error));
  //       return caught;
  //     }
  //   )
  // );

  private getReservations: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationsActions.getReservationsAction),
      exhaustMap(() => {
        return this.reservationService.getReservations().pipe(
          map((resp: { body: Reservation[] }) => {
            let reservations = resp.body;
            console.log(reservations);
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
        }) => {
          return this.reservationService
            .setReservation(
              action.email,
              action.username,
              action.phone,
              action.selectDate,
              action.selectTime,
              action.selectService
            )
            .pipe(
              map((response: Reservation[]) => {
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
          .updateReservation(action.id, action.selectDate, action.selectTime)
          .pipe(
            map((resp: Reservation[]) => {
              return ReservationsActions.updateReservationSuccessAction({
                reservations: resp,
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
