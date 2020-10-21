import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Portfolio } from 'src/app/modules/home/models/portfolio.model';
import { PortfolioKey, PortfolioState } from '../reducers/portfolio.reducer';

export const selectFeature = createFeatureSelector<PortfolioState>(
  PortfolioKey
);

export const portfolio = createSelector(
  selectFeature,
  (state: PortfolioState): Portfolio[] => state.portfolio
);
export const successMessage = createSelector(
  selectFeature,
  (state: PortfolioState): string => state.successMessage
);

export const errMessage = createSelector(
  selectFeature,
  (state: PortfolioState): Error => state.errMessage
);
