import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState, AuthKey } from '../reducers/auth.reducer';
import { User } from 'src/app/modules/auth/models/user.model';

export const selectFeature = createFeatureSelector<UserState>(AuthKey);

export const userInformation = createSelector(
  selectFeature,
  (state: UserState): User => state.user
);

export const loginFailed = createSelector(
  selectFeature,
  (state: UserState): string => state.loginError
);

export const forgotFailed = createSelector(
  selectFeature,
  (state: UserState): string => state.forgotError
);

export const forgotMessageSuccess = createSelector(
  selectFeature,
  (state: UserState): string => state.forgotMessageSuccess
);

export const resetMessageSuccess = createSelector(
  selectFeature,
  (state: UserState): string => state.resetMessageSuccess
);

export const resetFailed = createSelector(
  selectFeature,
  (state: UserState): string => state.resetError
);

export const resetToken = createSelector(
  selectFeature,
  (state: UserState): string => state.resetToken
);
