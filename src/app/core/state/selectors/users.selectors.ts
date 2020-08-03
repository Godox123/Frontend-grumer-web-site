import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UsersState, UsersKey } from '../reducers/users.reducer';
import { User } from 'src/app/modules/auth/models/user.model';

export const selectFeature = createFeatureSelector<UsersState>(UsersKey);

export const usersInformation = createSelector(
  selectFeature,
  (state: UsersState): User[] => state.users
);

export const usersInformationFailedMessage = createSelector(
  selectFeature,
  (state: UsersState): Error => state.errMessage
);

export const userDeleteSuccessMessage = createSelector(
  selectFeature,
  (state: UsersState): string => state.successMessage
);

export const userDeleteFailedMessage = createSelector(
  selectFeature,
  (state: UsersState): Error => state.errMessage
);
