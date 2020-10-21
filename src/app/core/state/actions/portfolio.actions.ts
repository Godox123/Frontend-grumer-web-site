import { createAction, props } from '@ngrx/store';
import { Portfolio } from 'src/app/modules/home/models/portfolio.model';

export const PortfolioActions = {
  getPortfolioAction: createAction('[GetPortfolioAction] [GetPortfolioAction'),
  getPortfolioSuccessAction: createAction(
    '[GetPortfolioSuccessAction] GetPortfolioSuccessAction',
    props<{
      portfolio: Portfolio[];
    }>()
  ),
  getPortfolioFailedAction: createAction(
    '[GetPortfolioFailedAction] GetPortfolioFailedAction',
    props<{
      error: Error;
    }>()
  ),
  setPortfolioAction: createAction(
    '[SetPortfolioAction] SetPortfolioAction',
    props<{
      photoUrlBefore: File;
      photoUrlAfter: File;
      description: string;
    }>()
  ),
  setPortfolioSuccessAction: createAction(
    '[SetPortfolioSuccessAction] SetPortfolioSuccessAction',
    props<{
      successMessage: string;
      portfolio: Portfolio[];
    }>()
  ),
  setPortfolioFailedAction: createAction(
    '[SetPortfolioFailedAction] SetPortfolioFailedAction',
    props<{
      error: Error;
    }>()
  ),
  updatePortfolioAction: createAction(
    '[UpdatePortfolioAction] UpdatePortfolioAction',
    props<{
      id: string;
      photoUrlBefore: File;
      photoUrlAfter: File;
      description: string;
    }>()
  ),
  updatePortfolioSuccessAction: createAction(
    '[UpdatePortfolioSuccessAction] UpdatePortfolioSuccessAction',
    props<{
      successMessage: string;
      portfolio: Portfolio[];
    }>()
  ),
  updatePortfolioFailedAction: createAction(
    '[UpdatePortfolioFailedAction] UpdatePortfolioFailedAction',
    props<{
      error: Error;
    }>()
  ),
  deletePortfolioAction: createAction(
    '[DeletePortfolioAction] DeletePortfolioAction',
    props<{
      id: string;
    }>()
  ),
  deletePortfolioSuccessAction: createAction(
    '[DeletePortfolioSuccessAction] DeletePortfolioSuccessAction',
    props<{
      successMessage: string;
      portfolio: Portfolio[];
    }>()
  ),
  deletePortfolioFailedAction: createAction(
    '[DeletePortfolioFailedAction] DeletePortfolioFailedAction',
    props<{
      error: Error;
    }>()
  )
};
