import { effect, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthState } from '../../states/auth/auth.state';

export const canActivateGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const auth = inject(AuthState);

  const val = auth.state()
  if (val.loading) {
    return false;
  }

  if (val.error) {
    return false;
  }

  if (!val.value || val.value.token.trim() === '') {
    return false;
  }

  auth.verify();

  return true
};
