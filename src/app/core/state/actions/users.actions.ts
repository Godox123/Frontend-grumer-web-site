import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modules/auth/models/user.model';

export const UsersActions = {
  getUsersAction: createAction('[ GetUsers Page]  GetUsers'),
  getUsersSuccessAction: createAction(
    '[ GetUsersSuccess Page]  GetUsersSuccess',
    props<{
      users: User[];
    }>()
  ),
  getUsersFailedAction: createAction(
    '[ GetUserFailed Page]  GetUserFailed',
    props<{ error: Error }>()
  ),
  deleteUserAction: createAction(
    '[DeleteUser Page] DeleteUser',
    props<{
      id: string;
    }>()
  ),
  deleteUserSuccessAction: createAction(
    '[DeleteUserSuccessAction Page] DeleteUserSuccessAction',
    props<{
      users: User[];
      message: string;
    }>()
  ),
  deleteUserFailedAction: createAction(
    '[deleteUserFailedAction Page] deleteUserFailedAction',
    props<{
      err: Error;
    }>()
  )
};
