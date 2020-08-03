import { createReducer, on, Action } from '@ngrx/store';

import { User } from 'src/app/modules/auth/models/user.model';
import { UsersActions } from '../actions/users.actions';

export const UsersKey = 'UsersKey';

export interface UsersState {
  users: User[];
  successMessage: string;
  errMessage: Error;
}

export const initialState = {
  users: null,
  successMessage: null,
  errMessage: null
};

const _usersReducer = createReducer(
  initialState,
  on(UsersActions.getUsersSuccessAction, (state, response) => ({
    ...state,
    users: response.users
  })),
  on(UsersActions.getUsersFailedAction, (state, response) => ({
    ...state,
    errMessage: response.error
  })),
  on(UsersActions.deleteUserSuccessAction, (state, response) => ({
    ...state,
    users: response.users,
    successMessage: response.message
  })),
  on(UsersActions.deleteUserFailedAction, (state, response) => ({
    ...state,
    errMessage: response.err
  }))
);

export const usersReducer = (state: UsersState, action: Action): UsersState => {
  return _usersReducer(state, action);
};
