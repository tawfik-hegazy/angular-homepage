import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {

const user=inject(AuthService).user.value;
return user?.token ? true:inject(Router).createUrlTree(['/signin'])


  return true;
};
