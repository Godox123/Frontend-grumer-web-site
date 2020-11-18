import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modules/auth/models/user.model';

export const SharedActions = {
  showMenuAction: createAction('[ShowMenuAction] ShowMenuAction'),
  showMenuFailedAction: createAction(
    '[ShowMenuFailedAction] ShowMenuFailedAction',
    props<{
      err: Error;
    }>()
  ),
  checkWidthWindowAction: createAction(
    '[CheckWidthWindowAction] CheckWidthWindowAction'
  ),
  checkWidthWindowSuccessAction: createAction(
    '[CheckWidthWindowSuccessAction] CheckWidthWindowSuccessAction',
    props<{
      windowWidth: boolean;
    }>()
  ),
  checkWidthWindowFailedAction: createAction(
    '[CheckWidthWindowFailedAction] CheckWidthWindowFailedAction',
    props<{
      err: Error;
    }>()
  ),
  searchUserAction: createAction(
    '[SearchUserAction] SearchUserAction',
    props<{
      searchValue: number;
    }>()
  ),
  searchUserSuccessAction: createAction(
    '[SearchUserSuccessAction] SearchUserSuccessAction',
    props<{
      findedUsers: User[];
    }>()
  ),
  searchUserFailedAction: createAction(
    '[SearchUserFailedAction] SearchUserFailedAction',
    props<{ err: Error }>()
  )
};
