import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { UserState, authReducer, AuthKey } from './auth.reducer';
import { UsersKey, UsersState, usersReducer } from './users.reducer';
import {
  ReservationsKey,
  ReservationsState,
  reservationsReducer
} from './reservations.reducer';
import {
  ServicesKey,
  ServicesState,
  servicesReducer
} from './services.reducer';

export interface State {
  [AuthKey]: UserState;
  [UsersKey]: UsersState;
  [ReservationsKey]: ReservationsState;
  [ServicesKey]: ServicesState;
}

export const reducers: ActionReducerMap<State> = {
  [AuthKey]: authReducer,
  [UsersKey]: usersReducer,
  [ReservationsKey]: reservationsReducer,
  [ServicesKey]: servicesReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
