import { inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  // return authService.userData() != null || router.navigateByUrl('/signin');

  return new Promise<boolean>((resolve) => {
    onAuthStateChanged(authService.fAuth, (user) => {
      if (user) {
        resolve(true);
      } else {
        snackBar.open('Please Log In first!', '', { duration: 3000 });
        resolve(router.navigateByUrl('/signin'));
      }
    });
  });
};
