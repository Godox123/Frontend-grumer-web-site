import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { UserState, authReducer, AuthKey } from './auth.reducer';
import { UsersKey, UsersState, usersReducer } from './users.reducer';

export interface State {
  [AuthKey]: UserState;
  [UsersKey]: UsersState;
}

export const reducers: ActionReducerMap<State> = {
  [AuthKey]: authReducer,
  [UsersKey]: usersReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
