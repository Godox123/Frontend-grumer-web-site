import { LoginEffect } from './auth.effects';
import { AuthRedirectEffect } from './auth.redirect.effects';
import { UsersEffect } from './users.effects';
import { ReservationsEffect } from './reservations.effects';

export const effects = [
  LoginEffect,
  AuthRedirectEffect,
  UsersEffect,
  ReservationsEffect
];
