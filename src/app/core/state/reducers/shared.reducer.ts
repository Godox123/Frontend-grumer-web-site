import { createReducer, on, Action } from '@ngrx/store';
import { User } from 'src/app/modules/auth/models/user.model';
import { SharedActions } from '../actions/shared.actions';

export const SharedKey = 'SharedKey';

export interface SharedState {
  menuState: boolean;
  widthWindow: boolean;
  errMessage: Error;
  finedUsers: User[];
}

export const initialState = {
  menuState: false,
  widthWindow: true,
  errMessage: null,
  finedUsers: null
};
const _sharedReducer = createReducer(
  initialState,
  on(SharedActions.showMenuAction, (state, response) => ({
    ...state,
    menuState: !state.menuState
  })),
  on(SharedActions.showMenuFailedAction, (state, response) => ({
    ...state,
    errMessage: response.err
  })),
  on(SharedActions.checkWidthWindowSuccessAction, (state, response) => ({
    ...state,
    widthWindow: response.windowWidth
  })),
  on(SharedActions.checkWidthWindowFailedAction, (state, response) => ({
    ...state,
    errMessage: response.err
  })),
  on(SharedActions.searchUserSuccessAction, (state, response) => ({
    ...state,
    finedUsers: response.findedUsers
  })),
  on(SharedActions.searchUserFailedAction, (state, response) => ({
    ...state,
    errMessage: response.err
  }))
);

export const sharedReducer = (
  state: SharedState,
  action: Action
): SharedState => {
  return _sharedReducer(state, action);
};
