import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { PortfolioCollectionService } from 'src/app/modules/home/services/portfolio-collection.service';
import { PortfolioActions } from '../actions/portfolio.actions';
import { Portfolio } from 'src/app/modules/home/models/portfolio.model';

@Injectable()
export class PortfolioEffect {
  constructor(
    private actions$: Actions,
    private portfolioService: PortfolioCollectionService
  ) {}

  private getPortfolio: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.getPortfolioAction),
      exhaustMap(() => {
        return this.portfolioService.getPortfolio().pipe(
          map((resp: { body: Portfolio[] }) => {
            let portfolio = resp.body;
            return PortfolioActions.getPortfolioSuccessAction({ portfolio });
          })
        );
      }),
      catchError((error: Error) => {
        return of(PortfolioActions.getPortfolioFailedAction({ error }));
      })
    )
  );

  private setPortfolio: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.setPortfolioAction),
      exhaustMap(action => {
        console.log(action);
        return this.portfolioService
          .setPortfolio(
            action.photoUrlBefore,
            action.photoUrlAfter,
            action.description
          )
          .pipe(
            map((resp: { body: Portfolio[] }) => {
              let portfolio = resp.body;
              return PortfolioActions.setPortfolioSuccessAction({
                portfolio,
                successMessage: 'Новый сервис успешно добавлен'
              });
            })
          );
      }),
      catchError((error: Error) => {
        return of(PortfolioActions.setPortfolioFailedAction({ error }));
      })
    )
  );

  private updatePortfolio: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.updatePortfolioAction),
      exhaustMap(action => {
        return this.portfolioService
          .updatePortfolio(
            action.id,
            action.photoUrlBefore,
            action.photoUrlAfter,
            action.description
          )
          .pipe(
            map((resp: { body: Portfolio[] }) => {
              let portfolio = resp.body;
              return PortfolioActions.updatePortfolioSuccessAction({
                portfolio,
                successMessage: 'Обновлено успешно'
              });
            })
          );
      }),
      catchError((error: Error) => {
        return of(PortfolioActions.updatePortfolioFailedAction({ error }));
      })
    )
  );

  private deletePortfolio: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.deletePortfolioAction),
      exhaustMap(action =>
        this.portfolioService.deletePortfolio(action.id).pipe(
          map((resp: { body: Portfolio[] }) => {
            let portfolio = resp.body;
            return PortfolioActions.deletePortfolioSuccessAction({
              portfolio,
              successMessage: 'Удалено успешно'
            });
          })
        )
      ),
      catchError((error: Error) => {
        return of(PortfolioActions.deletePortfolioFailedAction({ error }));
      })
    )
  );
}
