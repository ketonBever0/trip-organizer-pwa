  import { inject } from '@angular/core';
  import { Auth } from '@angular/fire/auth';
  import { Router, type CanActivateFn } from '@angular/router';

  export const authGuard: CanActivateFn = (route, state) => {
    const fAuth: Auth = inject(Auth);
    const router: Router = inject(Router);

    return !!fAuth.currentUser || router.navigateByUrl("/signin");
  };
