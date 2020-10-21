import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SharedKey, SharedState } from '../reducers/shared.reducer';

export const selectFeature = createFeatureSelector<SharedState>(SharedKey);

export const menuState = createSelector(
  selectFeature,
  (state: SharedState): boolean => state.menuState
);
