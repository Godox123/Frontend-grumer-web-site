import { createSelector, createFeatureSelector } from '@ngrx/store';
import {
  ReservationsState,
  ReservationsKey
} from '../reducers/reservations.reducer';
import { Reservation } from 'src/app/modules/home/models/reservation.model';

export const selectFeature = createFeatureSelector<ReservationsState>(
  ReservationsKey
);

export const reservationsInformation = createSelector(
  selectFeature,
  (state: ReservationsState): Reservation[] => state.reservations
);

export const reservationsSuccessMessage = createSelector(
  selectFeature,
  (state: ReservationsState): string => state.successMessage
);

export const reservationsFailedMessage = createSelector(
  selectFeature,
  (state: ReservationsState): Error => state.errMessage
);

export const reservationsTime = createSelector(
  selectFeature,
  (state: ReservationsState): number[] => state.reservationTime
);
