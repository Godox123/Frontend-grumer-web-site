import { createReducer, on, Action } from '@ngrx/store';
import { SharedActions } from '../actions/shared.actions';

export const SharedKey = 'SharedKey';

export interface SharedState {
  menuState: boolean;
  errMessage: Error;
}

export const initialState = {
  menuState: false,
  errMessage: null
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
  }))
);

export const sharedReducer = (
  state: SharedState,
  action: Action
): SharedState => {
  return _sharedReducer(state, action);
};
