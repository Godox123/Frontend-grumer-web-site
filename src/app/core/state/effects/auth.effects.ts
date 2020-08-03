import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { authActions } from '../actions/auth.actions';
import { Action, Store, select } from '@ngrx/store';
import { HttpResponse } from '@angular/common/http';
import { User } from 'src/app/modules/auth/models/user.model';
import { UserState } from '../reducers/auth.reducer';
import { resetToken } from '../selectors/user.selectors';

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store$: Store<UserState>
  ) {}

  private login$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginAction),
      exhaustMap((action: { email: string; password: string }) => {
        return this.authService.login(action.email, action.password).pipe(
          map((token: HttpResponse<{ token: string }>) => {
            let date: string = new Date(Date.now() + 72e6).toUTCString();
            // document.cookie = "user=John; secure";
            document.cookie = `token=${token.body.token};SameSite;expires=${date}`;
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            return authActions.loginSuccessAction();
          }),
          catchError(
            (error: {
              error: {
                message: string;
              };
            }) => {
              const err = error.error.message;
              return of(authActions.loginFailedAction({ err }));
            }
          )
        );
      })
    )
  );

  private signUp$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signUpAction),
      exhaustMap(
        (action: {
          email: string;
          password: string;
          username: string;
          phone: number;
        }) => {
          return this.authService
            .registration(
              action.email,
              action.password,
              action.username,
              action.phone
            )
            .pipe(
              map((token: HttpResponse<{ token: string }>) => {
                let date: string = new Date(Date.now() + 72e6).toUTCString();
                // document.cookie = "user=John; secure";
                document.cookie = `token=${token.body.token};SameSite;expires=${date}`;
                localStorage.setItem('isLoggedIn', JSON.stringify(true));
                return authActions.signUpSuccessAction();
              }),
              catchError((error: Error) =>
                of(authActions.signUpFailedAction({ error }))
              )
            );
        }
      )
    )
  );

  private user$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getUserAction),
      exhaustMap(() => {
        return this.authService.getUserInformation().pipe(
          map((user: User) => {
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            return authActions.getUserSuccessAction({ user });
          }),
          catchError((error: Error) => {
            localStorage.setItem('isLoggedIn', JSON.stringify(false));
            return of(authActions.getUserFailedAction({ error }));
          })
        );
      })
    )
  );

  private forgot$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.forgotAction),
      exhaustMap(action => {
        return this.authService.forgot(action.email).pipe(
          map(() => {
            return authActions.forgotSuccessAction({
              succesMessage:
                'На вашу электронную почту была выслана ссылка на изменение пароля.'
            });
          }),
          catchError(
            (error: {
              error: {
                message: string;
              };
            }) => {
              const err = error.error.message;
              return of(authActions.forgotFailedAction({ err }));
            }
          )
        );
      })
    )
  );

  private reset$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.resetAction),
      withLatestFrom(this.store$.pipe(select(resetToken))),
      exhaustMap(([data, resetToken]) => {
        return this.authService.reset(data.password, resetToken).pipe(
          map(() =>
            authActions.resetSuccessAction({
              succesMessage: 'Ваш пароль был успешно изменен.'
            })
          )
        );
      }),
      catchError(
        (error: {
          error: {
            message: string;
          };
        }) => {
          const err = error.error.message;
          return of(authActions.resetFailedAction({ err }));
        }
      )
    );
  });
}
