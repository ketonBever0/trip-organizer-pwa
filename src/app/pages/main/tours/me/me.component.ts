import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TourType } from '@app/core/models/tour';
import { AuthService } from '@app/core/services/auth/auth.service';
import { TourService } from '@app/core/services/tour/tour.service';

@Component({
  selector: 'app-me',
  imports: [DatePipe, RouterLink, MatButtonModule],
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss',
})
export class MeComponent implements OnInit {
  tours: TourType[] = [];

  constructor(
    protected readonly fAuth: AuthService,
    protected readonly ts: TourService
  ) {
    effect(async () => {
      if (this.fAuth.userData()?.id) {
        this.tours = await ts.getMyTours();
      }
    });
  }

  async ngOnInit() {}
}
