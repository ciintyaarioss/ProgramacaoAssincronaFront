import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userType = authService.getUserType();
  const allowedRoles = route.data['roles'] as Array<string>;

  if (allowedRoles && allowedRoles.includes(userType)) {
    return true;
  }

  alert('Acesso negado');
  router.navigate(['/home']);
  return false;
};