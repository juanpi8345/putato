import { inject } from '@angular/core';
import { CanActivateFn, Router, } from '@angular/router';
import { LoginService } from './login.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(LoginService).isLoggedIn()) {
    return true;
  }
  inject(Router).navigate(['/home']);
  return false;
};
