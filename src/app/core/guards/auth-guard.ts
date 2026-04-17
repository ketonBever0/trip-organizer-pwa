import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authGuard = (route: any, state: any) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userData$.pipe(
    take(1),
    map(user => {
      if (user) {
        return true; // User is signed in, allow access
      } else {
        // User is not signed in, redirect to auth page
        router.navigate(['/auth']);
        return false;
      }
    })
  );
};
