import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { NewService } from 'src/app/modules/home/services/new.service';
import { ServicesActions } from '../actions/services.actions';
import { Service } from 'src/app/modules/home/models/service.model';

@Injectable()
export class ServicesEffects {
  constructor(private actions$: Actions, private newService: NewService) {}

  private getServices: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ServicesActions.getServicesAction),
      exhaustMap(() => {
        return this.newService.getServices().pipe(
          map((resp: { body: Service[] }) => {
            let services = resp.body;
            return ServicesActions.getServicesSuccessAction({ services });
          })
        );
      }),
      catchError((err: Error) => {
        return of(ServicesActions.getServicesFailedAction({ err }));
      })
    )
  );

  private setService: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ServicesActions.setServiceAction),
      exhaustMap(action => {
        return this.newService
          .setService(action.servicename, action.photoUrl, action.description)
          .pipe(
            map((resp: { body: Service[] }) => {
              let services = resp.body;

              return ServicesActions.setServiceSuccessAction({
                services,
                successMessage: 'Новый сервис успешно добавлен'
              });
            })
          );
      }),
      catchError((err: Error) => {
        return of(ServicesActions.setServiceFailedAction({ err }));
      })
    )
  );

  private updateService: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ServicesActions.updateServiceAction),
      exhaustMap(action => {
        return this.newService
          .updateService(
            action.id,
            action.servicename,
            action.photoUrl,
            action.description
          )
          .pipe(
            map((resp: { body: Service[] }) => {
              let services = resp.body;
              return ServicesActions.updateServiceSuccessAction({
                services,
                successMessage: 'Обновлено успешно'
              });
            })
          );
      }),
      catchError((err: Error) => {
        return of(ServicesActions.updateServiceFailedAction({ err }));
      })
    )
  );

  private deleteService: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ServicesActions.deleteServiceAction),
      exhaustMap(action =>
        this.newService.deleteService(action.id).pipe(
          map((resp: { body: Service[] }) => {
            let services = resp.body;
            return ServicesActions.deleteServiceSuccessAction({
              successMessage: 'Удалено успешно'
            });
          })
        )
      ),
      catchError((err: Error) => {
        return of(ServicesActions.deleteServiceFailedAction({ err }));
      })
    )
  );
}
