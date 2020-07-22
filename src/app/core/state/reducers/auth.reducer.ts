import { createReducer, on, Action } from '@ngrx/store';
import { authActions } from '../actions/auth.actions';
import { User } from 'src/app/modules/auth/models/user.model';

export const AuthKey = '@sdf4#shf_sa1QQfsgq';

export interface UserState {
  loginError: string;
  user: User;
  resetToken: string;
  forgotMessageSuccess: string;
  resetMessageSuccess: string;
  forgotError: string;
  resetError: string;
}

export const initialState = {
  loginError: null,
  user: null,
  resetToken: null,
  forgotMessageSuccess: null,
  resetMessageSuccess: null,
  forgotError: null,
  resetError: null
};

const _authReducer = createReducer(
  initialState,
  on(authActions.getUserSuccessAction, (state, response) => ({
    ...state,
    user: response.user
  })),
  on(authActions.loginFailedAction, (state, response) => ({
    ...state,
    loginError: response.err
  })),
  on(authActions.forgotSuccessAction, (state, response) => ({
    ...state,
    forgotMessageSuccess: response.succesMessage
  })),
  on(authActions.forgotFailedAction, (state, response) => ({
    ...state,
    forgotError: response.err
  })),
  on(authActions.resetSuccessAction, (state, response) => ({
    ...state,
    resetMessageSuccess: response.succesMessage
  })),
  on(authActions.resetFailedAction, (state, response) => ({
    ...state,
    resetError: response.err
  })),
  on(authActions.getResetTokenAction, (state, response) => ({
    ...state,
    resetToken: response.token
  }))
);

export const authReducer = (state: UserState, action: Action): UserState => {
  return _authReducer(state, action);
};
