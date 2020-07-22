import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  public canActivate(): boolean | UrlTree {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/']);
      return false;
    } else if (localStorage.getItem('isLoggedIn') === 'false') {
      return true;
    }
  }
}
