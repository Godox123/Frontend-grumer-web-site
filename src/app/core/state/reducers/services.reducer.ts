import { createReducer, on, Action } from '@ngrx/store';
import { Service } from 'src/app/modules/home/models/service.model';
import { ServicesActions } from '../actions/services.actions';

export const ServicesKey = 'ServicesKey';

export interface ServicesState {
  services: Service[];
  successMessage: string;
  errMessage: Error;
}

export const initialState = {
  services: null,
  successMessage: null,
  errMessage: null
};
const _servicesReducer = createReducer(
  initialState,
  on(ServicesActions.getServicesSuccessAction, (state, response) => ({
    ...state,
    services: response.services
  })),
  on(ServicesActions.getServicesFailedAction, (state, response) => ({
    ...state,
    errMessage: response.err
  })),
  on(ServicesActions.setServiceSuccessAction, (state, response) => ({
    ...state,
    services: response.services,
    successMessage: response.successMessage
  })),
  on(ServicesActions.setServiceFailedAction, (state, response) => ({
    ...state,
    errMessage: response.err
  })),
  on(ServicesActions.updateServiceSuccessAction, (state, response) => ({
    ...state,
    services: response.successMessage,
    successMessage: response.successMessage
  })),
  on(ServicesActions.updateServiceFailedAction, (state, response) => ({
    ...state,
    errMessage: response.err
  })),
  on(ServicesActions.deleteServiceSuccessAction, (state, response) => ({
    ...state,
    successMessage: response.successMessage
  })),
  on(ServicesActions.deleteServiceFailedAction, (state, response) => ({
    ...state,
    errMessage: response.err
  }))
);

export const servicesReducer = (
  state: ServicesState,
  action: Action
): ServicesState => {
  return _servicesReducer(state, action);
};
