import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modules/auth/models/user.model';

export const authActions = {
  getResetTokenAction: createAction(
    '[ getResetToken Page]  getResetToken',
    props<{ token: string }>()
  ),
  resetAction: createAction(
    '[Reset Page] Reset',
    props<{ password: string }>()
  ),
  resetSuccessAction: createAction(
    '[ResetSuccess Page] ResetSuccess',
    props<{ succesMessage: string }>()
  ),
  resetFailedAction: createAction(
    '[ResetFailed Page] ResetFailed',
    props<{ err: string }>()
  ),
  forgotAction: createAction(
    '[Forgot Page] Forgot',
    props<{ email: string }>()
  ),
  forgotSuccessAction: createAction(
    '[ForgotSuccess Page] ForgotSuccess',
    props<{ succesMessage: string }>()
  ),
  forgotFailedAction: createAction(
    '[ForgotFailed Page] ForgotFailed',
    props<{ err: string }>()
  ),
  loginAction: createAction(
    '[Login Page] Login',
    props<{ email: string; password: string }>()
  ),
  loginSuccessAction: createAction('[LoginSuccess Page] LoginSuccess'),
  loginFailedAction: createAction(
    '[LoginFailed Page] LoginFailed',
    props<{ err: string }>()
  ),
  signUpAction: createAction(
    '[SignUp Page] SignUp',
    props<{
      email: string;
      password: string;
      username: string;
      phone: number;
    }>()
  ),
  signUpSuccessAction: createAction('[SignUpSuccess Page] SignUpSuccess'),
  signUpFailedAction: createAction(
    '[SignUpFailed Page] SignUpFailed',
    props<{ error: Error }>()
  ),
  getUserAction: createAction('[ GetUser Page]  GetUser'),
  getUserSuccessAction: createAction(
    '[ GetUserSuccess Page]  GetUserSuccess',
    props<{
      user: User;
    }>()
  ),
  getUserFailedAction: createAction(
    '[ GetUserFailed Page]  GetUserFailed',
    props<{ error: Error }>()
  )
};
