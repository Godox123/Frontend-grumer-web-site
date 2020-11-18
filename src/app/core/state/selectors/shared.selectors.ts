import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from 'src/app/modules/auth/models/user.model';
import { SharedKey, SharedState } from '../reducers/shared.reducer';

export const selectFeature = createFeatureSelector<SharedState>(SharedKey);

export const menuState = createSelector(
  selectFeature,
  (state: SharedState): boolean => state.menuState
);

export const windowWidth = createSelector(
  selectFeature,
  (state: SharedState): boolean => state.widthWindow
);

export const findedUsers = createSelector(
  selectFeature,
  (state: SharedState): User[] => state.finedUsers
);
