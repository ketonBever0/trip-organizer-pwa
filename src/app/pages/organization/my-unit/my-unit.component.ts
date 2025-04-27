import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-unit',
  imports: [],
  templateUrl: './my-unit.component.html',
  styleUrl: './my-unit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyUnitComponent { }
