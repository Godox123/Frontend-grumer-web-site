import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, withLatestFrom } from 'rxjs/operators';
import { User } from 'src/app/modules/auth/models/user.model';
import { SharedActions } from '../actions/shared.actions';
import { UsersState } from '../reducers/users.reducer';
import { usersInformation } from '../selectors/users.selectors';

@Injectable()
export class SharedEffect {
  constructor(
    private actions$: Actions,
    private usersState: Store<UsersState>
  ) {}

  private checkWidthWindow: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedActions.checkWidthWindowAction),
      map(() => {
        let windowWidth: boolean;
        window.innerWidth < 1000 ? (windowWidth = true) : (windowWidth = false);
        return SharedActions.checkWidthWindowSuccessAction({ windowWidth });
      }),
      catchError((err: Error) => {
        return of(SharedActions.checkWidthWindowFailedAction({ err }));
      })
    )
  );

  private findUsers: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedActions.searchUserAction),
      map(action => action.searchValue),
      withLatestFrom(this.usersState.pipe(select(usersInformation))),
      map(([searchValue, users]) => {
        const findedUsers: User[] = [];
        users.forEach(user => {
          if (user.phone === searchValue) {
            findedUsers.push(user);
          }
        });
        if (findedUsers[0]) {
          return SharedActions.searchUserSuccessAction({
            findedUsers
          });
        } else {
          return SharedActions.searchUserSuccessAction({
            findedUsers: null
          });
        }
      }),
      catchError((err: Error) => {
        return of(SharedActions.searchUserFailedAction({ err }));
      })
    )
  );
}
