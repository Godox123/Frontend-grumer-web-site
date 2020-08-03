import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { UsersService } from 'src/app/modules/home/services/users.service';
import { Action } from '@ngrx/store';
import { UsersActions } from '../actions/users.actions';
import { User } from 'src/app/modules/auth/models/user.model';

@Injectable()
export class UsersEffect {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  private getUsers: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUsersAction),
      exhaustMap(() => {
        return this.usersService.getUsers().pipe(
          map((users: User[]) => {
            return UsersActions.getUsersSuccessAction({ users });
          }),
          catchError((error: Error) => {
            return of(UsersActions.getUsersFailedAction({ error }));
          })
        );
      })
    )
  );

  private deleteUser: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUserAction),
      exhaustMap((action: { id: string }) => {
        return this.usersService.deleteUser(action.id).pipe(
          map((resp: { body: User[] }) => {
            return UsersActions.deleteUserSuccessAction({
              users: resp.body,
              message: 'Пользователь успешно удален'
            });
          }),
          catchError((error: Error) => {
            return of(UsersActions.deleteUserFailedAction({ err: error }));
          })
        );
      })
    )
  );
}
