import { Component, inject, isDevMode, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { interval, Subject, takeUntil } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BotnavComponent } from './layout/botnav/botnav.component';
import { connect } from '@rxjs-insights/devtools/connect';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MatSnackBarModule, BotnavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'pwa-project';

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener('offline', this.offlineCb);
    window.removeEventListener('online', this.onlineCb);
  }

  private offlineCb!: () => void;
  private onlineCb!: () => void;

  private swUpdate = inject(SwUpdate);
  private snackBar = inject(MatSnackBar);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // this.swUpdate.activateUpdate();
    if (!isDevMode()) {
      interval(3000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.swUpdate.checkForUpdate().then((update) => {
            if (update) {
              alert('New version available!');
              window.location.reload();
            }
          });

          this.offlineCb = () => {
            this.snackBar.open('You are offline!', 'Ok', { duration: 10000 });
          };
          this.onlineCb = () => {
            this.snackBar.open('You are online!', '', { duration: 3000 });
          };
          window.addEventListener('offline', this.offlineCb);
          window.addEventListener('online', this.onlineCb);
        });
    } else {
      // connect();
    }
  }
}
