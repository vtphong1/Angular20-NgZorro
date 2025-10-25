import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectRoleData} from '@app/states/role/role.selectors';

// export const authGuard: CanActivateFn =(route, state) => {
//   const authService = inject(AuthService);
// };

export const roleGuard: CanActivateFn =(route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  const listRole = store.selectSignal(selectRoleData)() || [];
  const authorities = route.data['authorities'] || [];

  const checkRole = authorities?.some((item: string) => listRole?.includes(item));

  if (!checkRole) return router.createUrlTree(['/login']);
  return checkRole;
}
