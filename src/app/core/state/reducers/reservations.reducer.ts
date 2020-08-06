import { createReducer, on, Action } from '@ngrx/store';
import { Reservation } from 'src/app/modules/home/models/reservation.model';
import { ReservationsActions } from '../actions/reservation.actions';
import { state } from '@angular/animations';

export const ReservationsKey = 'ReservationsKey';

export interface ReservationsState {
  reservations: Reservation[];
  reservationTime: number[];
  successMessage: string;
  errMessage: Error;
}

export const initialState = {
  reservations: null,
  reservationTime: null,
  successMessage: null,
  errMessage: null
};

const _reservationsReducer = createReducer(
  initialState,
  on(
    ReservationsActions.clearReservationTimeSuccessAction,
    (state, response) => ({
      ...state,
      reservationTime: null,
      successMessage: response.successMessage
    })
  ),
  on(
    ReservationsActions.clearReservationTimeFailedAction,
    (state, response) => ({
      ...state,
      errMessage: response.errMessage
    })
  ),
  on(ReservationsActions.getReservationsSuccessAction, (state, response) => ({
    ...state,
    reservations: response.reservations
  })),
  on(ReservationsActions.getReservationsFailedAction, (state, response) => ({
    ...state,
    errMessage: response.error
  })),
  on(ReservationsActions.setReservationSuccessAction, (state, response) => ({
    ...state,
    reservations: response.reservations,
    reservationTime: null,
    successMessage: response.successMessage
  })),
  on(ReservationsActions.setReservationFailedAction, (state, response) => ({
    ...state,
    errMessage: response.error
  })),
  on(ReservationsActions.updateReservationSuccessAction, (state, response) => ({
    ...state,
    reservations: response.reservations,
    successMessage: response.message
  })),
  on(ReservationsActions.updateReservationFailedAction, (state, response) => ({
    ...state,
    errMessage: response.error
  })),
  on(ReservationsActions.deleteReservationSuccessAction, (state, response) => ({
    ...state,
    reservations: response.reservations,
    successMessage: response.message
  })),
  on(ReservationsActions.deleteReservationFailedAction, (state, response) => ({
    ...state,
    errMessage: response.error
  })),
  on(ReservationsActions.getSelectedDateSuccessAction, (state, response) => ({
    ...state,
    reservationTime: response.reservationTime
  }))
);

export const reservationsReducer = (
  state: ReservationsState,
  action: Action
): ReservationsState => {
  return _reservationsReducer(state, action);
};
