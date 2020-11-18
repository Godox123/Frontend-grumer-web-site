import { LoginEffect } from './auth.effects';
import { AuthRedirectEffect } from './auth.redirect.effects';
import { UsersEffect } from './users.effects';
import { ReservationsEffect } from './reservations.effects';
import { ServicesEffect } from './services.effects';
import { PortfolioEffect } from './portfolio.effects';
import { SharedEffect } from './shared.effects';

export const effects = [
  LoginEffect,
  AuthRedirectEffect,
  UsersEffect,
  ReservationsEffect,
  ServicesEffect,
  PortfolioEffect,
  SharedEffect
];
