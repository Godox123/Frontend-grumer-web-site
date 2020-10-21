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
import {
  PortfolioKey,
  portfolioReducer,
  PortfolioState
} from './portfolio.reducer';
import { SharedKey, sharedReducer, SharedState } from './shared.reducer';

export interface State {
  [AuthKey]: UserState;
  [UsersKey]: UsersState;
  [ReservationsKey]: ReservationsState;
  [ServicesKey]: ServicesState;
  [PortfolioKey]: PortfolioState;
  [SharedKey]: SharedState;
}

export const reducers: ActionReducerMap<State> = {
  [AuthKey]: authReducer,
  [UsersKey]: usersReducer,
  [ReservationsKey]: reservationsReducer,
  [ServicesKey]: servicesReducer,
  [PortfolioKey]: portfolioReducer,
  [SharedKey]: sharedReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
