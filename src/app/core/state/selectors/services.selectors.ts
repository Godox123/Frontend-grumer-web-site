import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ServicesState, ServicesKey } from '../reducers/services.reducer';
import { Service } from '../../../modules/home/models/service.model';

export const selectFeature = createFeatureSelector<ServicesState>(ServicesKey);

export const services = createSelector(
  selectFeature,
  (state: ServicesState): Service[] => state.services
);
export const successMessage = createSelector(
  selectFeature,
  (state: ServicesState): string => state.successMessage
);

export const errMessage = createSelector(
  selectFeature,
  (state: ServicesState): Error => state.errMessage
);
