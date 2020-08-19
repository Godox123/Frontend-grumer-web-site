import { createAction, props } from '@ngrx/store';
import { Service } from 'src/app/modules/home/models/service.model';

export const ServicesActions = {
  getServicesAction: createAction('[GetServicesAction] GetServicesAction'),
  getServicesSuccessAction: createAction(
    '[GetServicesSuccessAction] GetServicesSuccessAction',
    props<{
      services: Service[];
    }>()
  ),
  getServicesFailedAction: createAction(
    '[GetServicesFailedAction] GetServicesFailedAction',
    props<{ err: Error }>()
  ),
  setServiceAction: createAction(
    '[SetServiceAction] SetServiceAction',
    props<{
      servicename: string;
      photoUrl: string;
      description: string;
    }>()
  ),
  setServiceSuccessAction: createAction(
    '[SetServiceSuccessAction] SetServiceSuccessAction',
    props<{
      services: Service[];
      successMessage: string;
    }>()
  ),
  setServiceFailedAction: createAction(
    '[SetServiceFailedAction] SetServiceFailedAction',
    props<{
      err: Error;
    }>()
  ),
  updateServiceAction: createAction(
    'UpdateServiceAction UpdateServiceAction',
    props<{
      id: string;
      servicename: string;
      photoUrl: string;
      description: string;
    }>()
  ),
  updateServiceSuccessAction: createAction(
    '[UpdateServiceSuccessAction] UpdateServiceSuccessAction',
    props<{
      services: Service[];
      successMessage: string;
    }>()
  ),
  updateServiceFailedAction: createAction(
    '[UpdateServiceFailedAction] UpdateServiceFailedAction',
    props<{
      err: Error;
    }>()
  ),
  deleteServiceAction: createAction(
    '[DeleteServiceAction] DeleteServiceAction',
    props<{
      id: string;
    }>()
  ),
  deleteServiceSuccessAction: createAction(
    '[DeleteServiceSuccessAction] DeleteServiceSuccessAction',
    props<{
      successMessage: string;
    }>()
  ),
  deleteServiceFailedAction: createAction(
    '[DeleteServiceFailedAction], DeleteServiceFailedAction',
    props<{
      err: Error;
    }>()
  )
};
