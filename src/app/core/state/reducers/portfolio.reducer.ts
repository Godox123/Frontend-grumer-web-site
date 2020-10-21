import { createReducer, on, Action } from '@ngrx/store';
import { Portfolio } from 'src/app/modules/home/models/portfolio.model';
import { PortfolioActions } from '../actions/portfolio.actions';

export const PortfolioKey = 'PortfolioKey';

export interface PortfolioState {
  portfolio: Portfolio[];
  successMessage: string;
  errMessage: Error;
}

export const initialState = {
  portfolio: null,
  successMessage: null,
  errMessage: null
};
const _portfolioReducer = createReducer(
  initialState,
  on(PortfolioActions.getPortfolioSuccessAction, (state, response) => ({
    ...state,
    portfolio: response.portfolio
  })),
  on(PortfolioActions.getPortfolioFailedAction, (state, response) => ({
    ...state,
    errMessage: response.error
  })),
  on(PortfolioActions.setPortfolioSuccessAction, (state, response) => ({
    ...state,
    portfolio: response.portfolio,
    successMessage: response.successMessage
  })),
  on(PortfolioActions.setPortfolioFailedAction, (state, response) => ({
    ...state,
    errMessage: response.error
  })),
  on(PortfolioActions.updatePortfolioSuccessAction, (state, response) => ({
    ...state,
    portfolio: response.portfolio,
    successMessage: response.successMessage
  })),
  on(PortfolioActions.updatePortfolioFailedAction, (state, response) => ({
    ...state,
    errMessage: response.error
  })),
  on(PortfolioActions.deletePortfolioSuccessAction, (state, response) => ({
    ...state,
    portfolio: response.portfolio,
    successMessage: response.successMessage
  })),
  on(PortfolioActions.deletePortfolioFailedAction, (state, response) => ({
    ...state,
    errMessage: response.error
  }))
);

export const portfolioReducer = (
  state: PortfolioState,
  action: Action
): PortfolioState => {
  return _portfolioReducer(state, action);
};
