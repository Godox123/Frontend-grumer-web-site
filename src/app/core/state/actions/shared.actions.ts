import { createAction, props } from '@ngrx/store';

export const SharedActions = {
  showMenuAction: createAction('[ShowMenuAction] ShowMenuAction'),
  showMenuFailedAction: createAction(
    '[ShowMenuFailedAction] ShowMenuFailedAction',
    props<{
      err: Error;
    }>()
  )
};
