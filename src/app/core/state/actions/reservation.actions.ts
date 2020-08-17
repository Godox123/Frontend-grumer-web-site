import { createAction, props } from '@ngrx/store';
import { Reservation } from 'src/app/modules/home/models/reservation.model';

export const ReservationsActions = {
  clearReservationTimeAction: createAction(
    '[ClearReservationTimeAction] ClearReservationTimeAction'
  ),
  clearReservationTimeSuccessAction: createAction(
    '[ClearReservationTimeSuccessAction] ClearReservationTimeSuccessAction',
    props<{
      successMessage: string;
    }>()
  ),
  clearReservationTimeFailedAction: createAction(
    '[ClearReservationTimeFailedAction] ClearReservationTimeFailedAction',
    props<{ errMessage: Error }>()
  ),
  getSelectedDateAction: createAction(
    '[GetSelectedDate] GetSelectedDate',
    props<{
      selectDate: Date;
      selectService: string;
    }>()
  ),
  getSelectedDateSuccessAction: createAction(
    '[GetSelectedDateSuccess] GetSelectedDateSuccess',
    props<{
      reservationTime: number[];
    }>()
  ),
  getSelectedDateFailedAction: createAction(
    '[GetSelectedDateFailed] GetSelectedDateFailed',
    props<{
      error: Error;
    }>()
  ),
  getReservationsAction: createAction('[GetReservations] GetReservations'),
  getReservationsSuccessAction: createAction(
    '[GetReservationsSuccess] GetReservationsSuccess',
    props<{
      reservations: Reservation[];
    }>()
  ),
  getReservationsFailedAction: createAction(
    '[GetReservationsFailed] GetReservationsFailed',
    props<{
      error: Error;
    }>()
  ),
  deleteReservationAction: createAction(
    '[DeleteReservation] DeleteReservation',
    props<{
      id: string;
    }>()
  ),
  deleteReservationSuccessAction: createAction(
    '[DeleteReservationSuccess] DeleteReservationSuccess',
    props<{
      reservations: Reservation[];
      message: string;
    }>()
  ),
  deleteReservationFailedAction: createAction(
    '[DeleteReservationFailed] DeleteReservationFailed',
    props<{
      error: Error;
    }>()
  ),
  updateReservationAction: createAction(
    '[UpdateReservation] UpdateReservation',
    props<{
      id: string;
      selectDate: Date;
      selectTime: number;
      selectService: string;
    }>()
  ),
  updateReservationSuccessAction: createAction(
    '[UpdateReservationSuccess] UpdateReservationSuccess',
    props<{
      reservations: Reservation[];
      message: string;
    }>()
  ),
  updateReservationFailedAction: createAction(
    '[UpdateReservationFailed] UpdateReservationFailed',
    props<{
      error: Error;
    }>()
  ),
  setReservationAction: createAction(
    '[SetReservation] SetReservation',
    props<{
      email: string;
      username: string;
      phone: number;
      selectDate: Date;
      selectTime: number;
      selectService: string;
    }>()
  ),
  setReservationSuccessAction: createAction(
    '[SetReservationSuccess] SetReservationSuccess',
    props<{
      reservations: Reservation[];
      successMessage: string;
    }>()
  ),
  setReservationFailedAction: createAction(
    '[SetReservationFailed] SetReservationFailed',
    props<{
      error: Error;
    }>()
  )
};
