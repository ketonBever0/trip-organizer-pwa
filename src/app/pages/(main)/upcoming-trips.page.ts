import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'upcoming-page',
  standalone: true,
  imports: [CommonModule],
  template: ``,
})
export class UpcomingTripsPage implements OnInit {
  // private readonly service = inject(Service);

  constructor() {}

  ngOnInit(): void {}
}
